// Insira a palavra secreta aqui
global.SALT_KEY = '';

// Template de email
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong> seja bem vindo!';

module.exports = {
  // conexão com mongodb
  connectionString: '',
  
  // chave secreta da API sendgrid
  sendgridkey: ''
}