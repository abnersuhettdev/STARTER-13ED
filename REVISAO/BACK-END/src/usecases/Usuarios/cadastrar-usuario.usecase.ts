import { UsuarioJSON } from '../../models';
import { UsuariosRepository } from '../../repositories';

export type CadastrarUsuarioDTO = {
	email: string;
	senha: string;
};

type RetornoCadastroUsuario = {
	sucesso: boolean;
	mensagem: string;
	dados?: UsuarioJSON;
};

export class CadastrarUsuario {
	public execute(
		dadosNovoUsuario: CadastrarUsuarioDTO
	): RetornoCadastroUsuario {
		const repository = new UsuariosRepository();

		// 1 - olhar para a lista de usuarios e verifica se existe um outro usuario com o mesmo email já cadastrado
		if (
			repository.verificarSeExisteUsuarioPorEmail(dadosNovoUsuario.email)
		) {
			return {
				sucesso: false,
				mensagem: 'Já existe um usuário cadastrado com esse e-mail.',
			};
		}

		// 2 - criar o novo usuario
		// 3 - inserir o novo usuario na lista de usuarios
		const novoUsuarioCadastrado = repository.cadastrar(dadosNovoUsuario);

		return {
			sucesso: true,
			mensagem: 'Usuário cadastrado com sucesso!',
			dados: novoUsuarioCadastrado.toJSON(),
		};
	}
}
