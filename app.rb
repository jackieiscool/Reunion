require 'sinatra' 
require 'sinatra/base'
require 'erb'
require 'sinatra/activerecord'
require 'sinatra/reloader'
require './environments'
require 'pry'
require 'json'

class Category < ActiveRecord::Base
  has_many :suggestions

  validates :name, uniqueness: true
end

class Suggestion < ActiveRecord::Base
  belongs_to :category
end

# get '/' do
#   haml :welcome
# end

# get '/planning' do
#   @categories = Category.all
#   haml :planning
# end

get '/categories.json' do
  content_type :json
  Category.all.to_json
end

get '/*' do
  haml :app
end

# post '/create_category' do
#   category = Category.create(name: params[:name])
#   haml :planning
# end
