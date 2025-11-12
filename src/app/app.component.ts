import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RegistroPacienteService } from './services/paciente.service';
import { RegistroPaciente } from './paciente.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'gestao-pacientes';

  formPaciente!: FormGroup;
  filtroBusca = new FormControl<string>('');
  listaFiltrada$!: Observable<RegistroPaciente[]>;

  msgSucesso = '';
  msgErro = '';

  editando = false;
  idSelecionado: number | null = null;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroPacienteService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.configurarFiltroReativo();
  }

  /** Inicializa o formulário reativo */
  private inicializarFormulario(): void {
    this.formPaciente = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /** Configura filtro reativo para pesquisa */
  private configurarFiltroReativo(): void {
    const pacientes$ = this.registroService.listarPacientes();
    const termoBusca$ = this.filtroBusca.valueChanges.pipe(startWith(this.filtroBusca.value));

    this.listaFiltrada$ = combineLatest([pacientes$, termoBusca$]).pipe(
      map(([lista, termo]) => {
        if (!termo) return lista;
        const busca = termo.toLowerCase();
        return lista.filter(p =>
          p.nomeCompleto.toLowerCase().includes(busca) ||
          p.documentoCpf.includes(termo) ||
          p.contatoEmail.toLowerCase().includes(busca)
        );
      })
    );
  }

  /** Getters para facilitar acesso aos campos */
  get nome() { return this.formPaciente.get('nome'); }
  get cpf() { return this.formPaciente.get('cpf'); }
  get dataNascimento() { return this.formPaciente.get('dataNascimento'); }
  get email() { return this.formPaciente.get('email'); }

  /** Salva ou atualiza um paciente */
  salvarPaciente(): void {
    this.limparMensagens();

    if (this.formPaciente.invalid) {
      this.msgErro = 'Preencha corretamente todos os campos obrigatórios.';
      this.formPaciente.markAllAsTouched();
      return;
    }

    const paciente: RegistroPaciente = {
      identificador: this.idSelecionado ?? Date.now(), // gera ID se novo
      nomeCompleto: this.formPaciente.value.nome,
      documentoCpf: this.formPaciente.value.cpf,
      nascimento: this.formPaciente.value.dataNascimento,
      contatoEmail: this.formPaciente.value.email
    };

    if (this.editando && this.idSelecionado !== null) {
      this.registroService.editarPaciente(paciente);
      this.msgSucesso = 'Informações do paciente atualizadas com sucesso.';
    } else {
      this.registroService.cadastrarPaciente(paciente);
      this.msgSucesso = 'Paciente incluído na base de dados com sucesso.';
    }

    this.resetarFormulario();
  }

  /** Preenche o formulário com os dados do paciente para edição */
  editarPaciente(p: RegistroPaciente): void {
    this.editando = true;
    this.idSelecionado = p.identificador;
    this.formPaciente.patchValue({
      nome: p.nomeCompleto,
      cpf: p.documentoCpf,
      dataNascimento: p.nascimento,
      email: p.contatoEmail
    });
    this.limparMensagens();
  }

  /** Remove um paciente */
  removerPaciente(id: number): void {
    this.registroService.excluirPaciente(id);
    this.msgSucesso = 'Registro removido com sucesso.';
    if (this.idSelecionado === id) this.resetarFormulario();
  }

  /** Cancela a edição e limpa o formulário */
  cancelarEdicao(): void {
    this.resetarFormulario();
  }

  /** Reseta formulário e flags de edição */
  private resetarFormulario(): void {
    this.formPaciente.reset();
    this.editando = false;
    this.idSelecionado = null;
  }

  /** Limpa mensagens de sucesso/erro */
  private limparMensagens(): void {
    this.msgErro = '';
    this.msgSucesso = '';
  }

  /** Aplica máscara de CPF automaticamente */
  aplicarMascaraCPF(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 3 && valor.length <= 6) valor = valor.replace(/(\d{3})(\d+)/, '$1.$2');
    else if (valor.length > 6 && valor.length <= 9) valor = valor.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    else if (valor.length > 9) valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    input.value = valor;
    this.formPaciente.get('cpf')?.setValue(valor, { emitEvent: false });
  }

}
