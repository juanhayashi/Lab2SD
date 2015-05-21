require 'sinatra'
require 'json'

set :bind, '192.168.50.13'

get '/' do
  "Hello World!"
end

post '/datos' do
  request.body.rewind  # in case someone already read it
  datos = JSON.parse request.body.read
  puts "Hello #{datos['metodo']}!"
  puts "#{datos['numeros']}"
  "Hola desde Ruby/Sinatra"
end

