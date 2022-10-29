import { https } from './config';

export default {
  listar: () => {
    return https.get('tecnico');
  },

  salvar: (tecnico) => {
    return https.post('tecnico', tecnico);
  },

  atualizar: (tecnico) => {
    return https.put('https://www.unigran.br/campogrande/api/index.php/teste/tecnico/' + tecnico.id, tecnico);
  },

  deletar: (tecnico) => {
    return https.delete('https://www.unigran.br/campogrande/api/index.php/teste/tecnico/' + tecnico.id);
  }
}
