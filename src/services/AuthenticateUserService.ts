import axios from "axios";
/**
 * Receber o código (string);
 * Recuperar o access_token no github;
 * Reucperar informações do usuário no github;
 * Verificar se o usuário existe no banco de dados;
 * 	> SIM = Gerar um token;
 * 	> NÂO = Cria no banco e gera um token;
 * Retornar o token com as info do usuário logado.
 */

interface IAccessTokenResponse {
	access_token: string;
}

interface IUserResponse {
	id: number;
	name: string;
	login: string;
	avatar_url: string;
}

class AuthenticateUserService {
	async execute(code: string) {
		const url = "https://github.com/login/oauth/access_token";

		const { data: accessTokenResponse } =
			await axios.post<IAccessTokenResponse>(url, null, {
				params: {
					client_id: process.env.GITHUB_CLIENT_ID,
					client_secret: process.env.GITHUB_CLIENT_SECRET,
					code,
				},
				headers: {
					Accept: "application/json",
				},
			});

		const response = await axios.get<IUserResponse>(
			"https://api.github.com/user",
			{
				headers: {
					authorization: `Bearer ${accessTokenResponse.access_token}`,
				},
			}
		);

		return response.data;
	}
}

export { AuthenticateUserService };
