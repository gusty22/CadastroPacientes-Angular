import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistroPaciente } from '../paciente.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroPacienteService {
  private contadorId = 1;
  private listaInicial: RegistroPaciente[] = [];

  private pacientesSubject = new BehaviorSubject<RegistroPaciente[]>([]);

  constructor() {
    const exemplo: RegistroPaciente = {
      identificador: this.contadorId++,
      nomeCompleto: 'Maria de Souza',
      documentoCpf: '123.456.789-10',
      nascimento: '1985-05-20',
      contatoEmail: 'maria.souza@email.com'
    };

    this.listaInicial.push(exemplo);
    this.pacientesSubject.next(this.listaInicial);
  }

  listarPacientes(): Observable<RegistroPaciente[]> {
    return this.pacientesSubject.asObservable();
  }

  cadastrarPaciente(dados: Omit<RegistroPaciente, 'identificador'>): void {
    const novo: RegistroPaciente = {
      ...dados,
      identificador: this.contadorId++
    };

    const atual = this.pacientesSubject.getValue();
    this.pacientesSubject.next([...atual, novo]);
  }

  editarPaciente(atualizado: RegistroPaciente): void {
    const pacientes = this.pacientesSubject.getValue().map(p =>
      p.identificador === atualizado.identificador ? { ...atualizado } : p
    );
    this.pacientesSubject.next(pacientes);
  }

  excluirPaciente(id: number): void {
    const filtrados = this.pacientesSubject.getValue().filter(p => p.identificador !== id);
    this.pacientesSubject.next(filtrados);
  }

  buscarPorId(id: number): RegistroPaciente | undefined {
    return this.pacientesSubject.getValue().find(p => p.identificador === id);
  }

  limparRegistros(): void {
    this.pacientesSubject.next([]);
    this.contadorId = 1;
  }
}
