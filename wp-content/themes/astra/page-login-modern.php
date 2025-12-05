<?php
/**
 * Template Name: Login Moderno
 * Description: Página de login moderna com layout centralizado.
 *
 * @package Astra
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

<style>
	.ast-login-modern-wrapper {
		min-height: calc(100vh - 200px);
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at top left, #4f46e5, #0f172a);
		padding: 2rem 1rem;
	}

	.ast-login-modern-card {
		background: rgba(15, 23, 42, 0.9);
		border-radius: 1rem;
		padding: 2.5rem 2rem;
		max-width: 420px;
		width: 100%;
		box-shadow: 0 20px 40px rgba(15, 23, 42, 0.6);
		color: #e5e7eb;
		backdrop-filter: blur(16px);
	}

	.ast-login-modern-header {
		margin-bottom: 1.75rem;
		text-align: center;
	}

	.ast-login-modern-title {
		font-size: 1.875rem;
		font-weight: 700;
		color: #f9fafb;
		margin-bottom: 0.25rem;
	}

	.ast-login-modern-subtitle {
		font-size: 0.95rem;
		color: #9ca3af;
	}

	.ast-login-modern-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.ast-login-modern-field {
		position: relative;
	}

	.ast-login-modern-label {
		display: block;
		font-size: 0.8rem;
		font-weight: 500;
		color: #9ca3af;
		margin-bottom: 0.35rem;
	}

	.ast-login-modern-input {
		width: 100%;
		border-radius: 0.75rem;
		border: 1px solid rgba(148, 163, 184, 0.6);
		background: rgba(15, 23, 42, 0.85);
		color: #e5e7eb;
		padding: 0.75rem 0.9rem;
		font-size: 0.95rem;
		outline: none;
		transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
	}

	.ast-login-modern-input:focus {
		border-color: #6366f1;
		box-shadow: 0 0 0 1px #6366f1;
		background: rgba(15, 23, 42, 1);
	}

	.ast-login-modern-remember-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 0.25rem;
	}

	.ast-login-modern-remember {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.85rem;
		color: #9ca3af;
	}

	.ast-login-modern-remember input[type="checkbox"] {
		accent-color: #6366f1;
	}

	.ast-login-modern-forgot {
		font-size: 0.82rem;
	}

	.ast-login-modern-forgot a {
		color: #a5b4fc;
		text-decoration: none;
	}

	.ast-login-modern-forgot a:hover {
		color: #c7d2fe;
		text-decoration: underline;
	}

	.ast-login-modern-submit {
		margin-top: 0.5rem;
	}

	.ast-login-modern-button {
		width: 100%;
		border-radius: 999px;
		border: none;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		color: white;
		padding: 0.8rem 1rem;
		font-size: 0.98rem;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 15px 30px rgba(88, 80, 236, 0.5);
		transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
	}

	.ast-login-modern-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 18px 40px rgba(88, 80, 236, 0.7);
		filter: brightness(1.02);
	}

	.ast-login-modern-button:active {
		transform: translateY(0);
		box-shadow: 0 10px 24px rgba(88, 80, 236, 0.45);
	}

	.ast-login-modern-footer {
		margin-top: 1.75rem;
		text-align: center;
		font-size: 0.8rem;
		color: #6b7280;
	}

	.ast-login-modern-footer a {
		color: #a5b4fc;
		text-decoration: none;
	}

	.ast-login-modern-footer a:hover {
		color: #c7d2fe;
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.ast-login-modern-card {
			padding: 2rem 1.5rem;
		}

		.ast-login-modern-title {
			font-size: 1.5rem;
		}
	}
</style>

<div class="ast-login-modern-wrapper">
	<div class="ast-login-modern-card">
		<div class="ast-login-modern-header">
			<h1 class="ast-login-modern-title"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></h1>
			<p class="ast-login-modern-subtitle"><?php esc_html_e( 'Acesse sua conta para continuar', 'astra' ); ?></p>
		</div>

		<form class="ast-login-modern-form" action="<?php echo esc_url( wp_login_url( home_url() ) ); ?>" method="post">
			<div class="ast-login-modern-field">
				<label class="ast-login-modern-label" for="user_login"><?php esc_html_e( 'E-mail ou usuário', 'astra' ); ?></label>
				<input class="ast-login-modern-input" type="text" name="log" id="user_login" autocomplete="username" required />
			</div>

			<div class="ast-login-modern-field">
				<label class="ast-login-modern-label" for="user_pass"><?php esc_html_e( 'Senha', 'astra' ); ?></label>
				<input class="ast-login-modern-input" type="password" name="pwd" id="user_pass" autocomplete="current-password" required />
			</div>

			<div class="ast-login-modern-remember-row">
				<label class="ast-login-modern-remember">
					<input type="checkbox" name="rememberme" value="forever" />
					<span><?php esc_html_e( 'Manter conectado', 'astra' ); ?></span>
				</label>
				<span class="ast-login-modern-forgot">
					<a href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php esc_html_e( 'Esqueceu a senha?', 'astra' ); ?></a>
				</span>
			</div>

			<div class="ast-login-modern-submit">
				<button type="submit" class="ast-login-modern-button"><?php esc_html_e( 'Entrar', 'astra' ); ?></button>
			</div>

			<input type="hidden" name="redirect_to" value="<?php echo esc_url( home_url() ); ?>" />
		</form>

		<div class="ast-login-modern-footer">
			<?php if ( get_option( 'users_can_register' ) ) : ?>
				<span><?php esc_html_e( 'Ainda não tem conta?', 'astra' ); ?>
					<a href="<?php echo esc_url( wp_registration_url() ); ?>"><?php esc_html_e( 'Criar conta', 'astra' ); ?></a>
				</span>
			<?php else : ?>
				<span><?php esc_html_e( 'Área exclusiva para usuários registrados.', 'astra' ); ?></span>
			<?php endif; ?>
		</div>
	</div>
</div>

<?php get_footer();
