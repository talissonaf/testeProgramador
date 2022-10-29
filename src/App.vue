<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro de Técnicos</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">
        <label>
          Nome <span class="span-red">{{ erro.nome }}</span>
        </label>
        <input
          type="text"
          placeholder="Nome"
          v-model="tecnico.nome"
          maxlength="150"
        />

        <label>
          CPF <span class="span-red">{{ erro.cpf }}</span>
        </label>
        <input
          type="text"
          placeholder="CPF"
          v-model="tecnico.cpf"
          maxlength="14"
          v-mask="['###.###.###-##']"
        />

        <label>
          Data de Nascimento <span class="span-red">{{ erro.data_nascimento }}</span>
        </label>
        <input
          type="date"
          placeholder="Data de Nascimento"
          v-model="tecnico.data_nascimento"
        />

        <label>
          Gênero <span class="span-red">{{ erro.genero }}</span>
        </label>
        <input
          type="text"
          placeholder="M ou F"
          v-model="tecnico.genero"
          maxlength="1"
        />

        <label>
          E-mail <span class="span-red">{{ erro.email }}</span>
        </label>
        <input
          type="text"
          placeholder="E-mail"
          v-model="tecnico.email"
          maxlength="100"
        />

        <label>
          Telefone <span class="span-red">{{ erro.telefone }}</span>
        </label>
        <input
          type="text"
          placeholder="Telefone"
          v-model="tecnico.telefone"
          maxlength="20"
          v-mask="['(##)#####-####', '(##)####-####']"
        />

        <label>
          Seu diferencial <span class="span-red">{{ erro.seu_diferencial }}</span>
        </label>
        <input
          type="text"
          placeholder="Seu diferencial"
          v-model="tecnico.seu_diferencial"
          maxlength="500"
        />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left"></i>
        </button>
      </form>

      <br /><br />
      <label>BUSCAR PELO NOME</label>
      <input
        type="search"
        @input="filtro = $event.target.value"
        placeholder="Buscar técnico pelo nome"
      />

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>CPF</th>
            <th>DATA DE NASCIMENTO</th>
            <th>GÊNERO</th>
            <th>E-MAIL</th>
            <th>TELEFONE</th>
            <th>SEU DIFERENCIAL</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="tecnico of filtrarTecnico"
            :key="tecnico.id"
            :id="'tec-' + tecnico.id"
          >
            <td>{{ tecnico.nome }}</td>
            <td>{{ tecnico.cpf }}</td>
            <td>{{ tecnico.data_nascimento }}</td>
            <td>{{ tecnico.genero.toUpperCase() }}</td>
            <td>{{ tecnico.email }}</td>
            <td>{{ tecnico.telefone }}</td>
            <td>{{ tecnico.seu_diferencial }}</td>
            <td>
              <button
                @click="editar(tecnico)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">edit</i>
              </button>
              <button
                @click.prevent="remover(tecnico)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Tecnico from "./services/tecnicos";
import { TheMask } from "vue-the-mask";

export default {
  data() {
    return {
      // Declaração de 'v-models' para 'tecnico'.
      tecnico: {
        id: "",
        nome: "",
        cpf: "",
        data_nascimento: "",
        genero: "",
        email: "",
        telefone: "",
        seu_diferencial: "",
      },
      // Array de 'Técnicos' para ser utilizado na função 'filtrarTecnico()'.
      tecnicos: [],
      // Declaração de 'v-models' para 'erro'.
      erro: {
        nome: "*",
        cpf: "*",
        data_nascimento: "*",
        genero: "*",
        email: "*",
        telefone: "*",
        seu_diferencial: "*",
      },
      filtro: "",
    };
  },

  computed: {
    // Função que filtra e exibe os 'Técnicos' na lista.
    filtrarTecnico() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.tecnicos.filter((tecnico) => exp.test(tecnico.nome));
      } else {
        return this.tecnicos;
      }
    },
  },

  mounted() {
    // Chamada do 'método' listar().
    this.listar();
  },

  methods: {
    // Método responsável por listar os 'Técnicos'.
    listar() {
      Tecnico.listar().then((resposta) => {
        this.tecnicos = resposta.data;
      });
    },
    // Método chamado quando clica no botão 'Salvar' do formulário.
    salvar() {
      // Método que chama a validação dos campos do formulário.
      if (this.validaForm()) {
        // console.log(this.tecnico.nome);

        // Se houver 'Técnico' já cadastrado, os dados serão reinseridos
        // em seus respectivos lugares no formulário e as alterações
        // serão salvas.
        if (this.tecnico.id) {
          Tecnico.atualizar(this.tecnico)
            .then((resposta) => {
              // Limpa os dados do formulário.
              this.tecnico = {};
              // Exibe uma mensagem.
              alert("Atualizado com sucesso!");
              // Lista os dados novamente na tabela.
              this.listar();
              // Limpa o Array de 'erro'.
              this.erro = [];
              // Recarrega a página.
              this.refresh();
            })
            .catch((e) => {
              // Pega eventuais erros.
              this.erro = e.response.data.erro;
              C;
            });
        } else {
          // Se não houver 'Técnico' cadastrado, os dados serão salvos e incluídos na tabela.
          Tecnico.salvar(this.tecnico)
            .then((resposta) => {
              // Limpa os dados do formulário.
              this.tecnico = {};
              // Exibe uma mensagem.
              alert("Salvo com sucesso!");
              // Lista os dados novamente na tabela.
              this.listar();
              // Limpa o Array de 'erro'.
              this.erro = [];
              // Recarrega a página.
              window.location.reload();
            })
            .catch((e) => {
              // Pega eventuais erros.
              this.erro = e.response.data.erro;
            });
        }
      }
    },

    // Método para editar registro da tabela de 'Técnicos'.
    editar(tecnico) {
      this.tecnico = tecnico;
    },

    // Métodos responsável por deletar registro da tabela de 'Técnicos'.
    remover(tecnico) {
      // Exibe uma mensagem de confirmação para deletar.
      if (confirm("Deseja realmente excluir este técnico?")) {
        // Se o usuário clicar em 'ok', executa a função 'deletar()'.
        Tecnico.deletar(tecnico)
          .then((tecnico) => {
            // Declara uma variável local que recebe o índice do elemento selecionado
            let indice = this.tecnicos.indexOf(tecnico);
            // Remove o elemento selecionado e substitui o índice
            this.tecnicos.splice(indice, 1);
            // Exibe uma mensagem.
            alert("Registro apagado com sucesso");
            // Lista os dados novamente na tabela.
            this.listar();
            // Limpa o Array de 'erro'.
            this.erro = [];
          })
          .catch((err) => {
            // Pega eventuais erros.
            this.erro = "Erro ao apagar - " + err;
          });
      }
    },

    // Método responsável por validar os campos.
    validaForm() {
      // console.log("TECNICO:",this.tecnico);

      // Declara a variável 'erros' e a inicia com '0'.
      var erros = 0;

      // Substitui o texto dos erros por '*', caso não haja erro.
      this.erro.nome = "*";
      this.erro.cpf = "*";
      this.erro.data_nascimento = "*";
      this.erro.genero = "*";
      this.erro.email = "*";
      this.erro.telefone = "*";
      this.erro.seu_diferencial = "*";

      // Testa se há menos de 2 caracteres digitados no campo 'Nome'.
      if (this.tecnico.nome.length < 2) {
        // Exibe uma mensagem de erro ao lado da 'label' de 'nome'.
        this.erro.nome = "Por favor, digite um nome válido!";
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Testa se há menos de 11 caracteres digitados no campo 'CPF'.
      if (this.tecnico.cpf.length < 11) {
        // Exibe uma mensagem de erro ao lado da 'label' de 'CPF'.
        this.erro.cpf = "Por favor, digite um CPF válido (11 dígitos)!";
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Testa se há 'Data de Nascimento' preenchida.
      if (this.tecnico.data_nascimento == "") {
        // Exibe uma mensagem de erro ao lado da 'label' de 'Data de Nascimento'.
        this.erro.data_nascimento =
          'Por favor, digite uma "Data de Nascimento"!';
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Testa se o campo 'Gênero' foi preenchido corretamente ('M' ou 'F').
      if (this.tecnico.genero != "M" && this.tecnico.genero != "F") {
        // Exibe uma mensagem de erro ao lado da 'label' de 'Gênero'.
        this.erro.genero = "Por favor, digite M (masculino) ou F (feminino)!";
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Testa se há pelo menos 1 caracter digitado no campo 'Gênero'.
      if (this.tecnico.genero < 1) {
        // Exibe uma mensagem de erro ao lado da 'label' de 'Gênero'.
        this.erro.genero = "Por favor, digite M (masculino) ou F (feminino)!";
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Testa se há @ e . (ponto) digitados no campo 'E-mail'.
      if (
        this.tecnico.email.indexOf("@") &&
        this.tecnico.email.indexOf(".") < 0
      ) {
        // Exibe uma mensagem de erro ao lado da 'label' de 'E-mail'.
        this.erro.email = "Utilize um e-mail válido com @ e . (ponto)!";
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Testa se há menos de 13 caracteres digitados no campo 'Telefone'.
      if (this.tecnico.telefone.length < 13) {
        // Exibe uma mensagem de erro ao lado da 'label' de 'Telefone'.
        this.erro.telefone =
          "Por favor, digite um telefone válido! Ex.: (99)99999-9999";
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Testa se há pelo menos 1 caracter digitado no campo 'Seu diferencial'.
      if (this.tecnico.seu_diferencial.length < 1) {
        // Exibe uma mensagem de erro ao lado da 'label' de 'Seu diferencial'.
        this.erro.seu_diferencial = "Por favor, digite alguma qualidade sua!";
        // Acrescenta 1 ao conteúdo da variável 'erros'.
        erros++;
      }

      // Compara se a variável 'erros' está com exatamente 0 erros para retornar a validação
      return erros === 0;
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
th {
  text-align: center;
}
.span-red {
  color: red;
}
</style>