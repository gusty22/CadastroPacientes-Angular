import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('Teste do Componente Principal (AppComponent)', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule, NoopAnimationsModule]
    });
  });

  it('deve criar o componente principal sem erros', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const componente = fixture.componentInstance;
    expect(componente).toBeTruthy();
  });

  it('deve possuir o título "gestao-pacientes"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const componente = fixture.componentInstance;
    // O nome do título foi alterado no novo app.component.ts
    expect(componente.title).toEqual('gestao-pacientes');
  });

  it('deve exibir o título correto no elemento h1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const html = fixture.nativeElement as HTMLElement;
    // Confirma se o h1 contém o novo texto de cabeçalho
    expect(html.querySelector('h1')?.textContent)
      .toContain('Gerenciamento de Pacientes');
  });

  it('deve renderizar o formulário de cadastro no template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const html = fixture.nativeElement as HTMLElement;
    const formElement = html.querySelector('form');
    expect(formElement).not.toBeNull();
  });

});
