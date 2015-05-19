require 'sinatra'
require 'json'

get '/' do
  "Hello World!"
end

post '/datos' do
  request.body.rewind  # in case someone already read it
  datos = JSON.parse request.body.read
  puts "Hello #{datos['saludo']}!"
  puts "#{datos['numeros']}"
  "Hola desde Ruby/Sinatra"
end

