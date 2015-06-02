require 'sinatra'
require 'json'
require 'net/http'
require 'rest-client'
require 'thin'

set:bind, '10.42.0.1'
get '/' do
  "Hello World!"
end

post '/datos' do
  request.body.rewind  # in case someone already read it
  datos = JSON.parse request.body.read
  puts "\nNumeros recibidos\n#{datos['numeros']}"
	metodo=String.new(datos['metodo'])
	numeros=Array.new
	numeros= datos['numeros']
	numOrdenados=Array.new
	case metodo
		when 'quicksort' then
			numOrdenados=quicksort(numeros,0,numeros.length-1)
			numOrdenados=numeros
			puts "Numeros ordenados con #{metodo}\n#{numOrdenados}"
		when 'bubblesort' then
			numOrdenados=bubblesort(numeros)
			puts "Numeros ordenados con #{metodo}\n#{numOrdenados}"
		when 'mergesort' then
			numOrdenados=mergesort(numeros)
			puts "Numeros ordenados con #{metodo}\n#{numOrdenados}"
		else puts 'error en ingreso de metodo'
	end 

####

response = RestClient.post 'http://10.42.0.100:8081/send', {"numeros" => numOrdenados}.to_json, {:content_type => :json, :accept => :json}
puts "Se enviaron numeros ordenados"
puts ""
####

  "Hola desde Ruby"
end

#quicksort
def quicksort(array, from=0, to=nil)
    if to == nil
        # Sort the whole array, by default
        to = array.count - 1
    end
 
    if from >= to
        # Done sorting
        return
    end
 
    # Take a pivot value, at the far left
    pivot = array[from]
 
    # Min and Max pointers
    min = from
    max = to
 
    # Current free slot
    free = min
 
    while min < max
        if free == min # Evaluate array[max]
            if array[max] <= pivot # Smaller than pivot, must move
                array[free] = array[max]
                min += 1
                free = max
            else
                max -= 1
            end
        elsif free == max # Evaluate array[min]
            if array[min] >= pivot # Bigger than pivot, must move
                array[free] = array[min]
                max -= 1
                free = min
            else
                min += 1
            end
        else
            raise "Inconsistent state"
        end
    end
 
    array[free] = pivot
 
    quicksort array, from, free - 1
    quicksort array, free + 1, to
end
#fin quicksort

#bubblesort
def bubblesort(array)
  n = array.length
  loop do
    swapped = false

    (n-1).times do |i|
      if array[i] > array[i+1]
        array[i], array[i+1] = array[i+1], array[i]
        swapped = true
      end
    end
    break if not swapped
  end
  array
end
#fin bubblesort

#mergesort
def mergesort(array)
  def merge(left_sorted, right_sorted)
    res = []
    l = 0
    r = 0
 
    loop do
      break if r >= right_sorted.length and l >= left_sorted.length
 
      if r >= right_sorted.length or (l < left_sorted.length and left_sorted[l] < right_sorted[r])
        res << left_sorted[l]
        l += 1
      else
        res << right_sorted[r]
        r += 1
      end
    end
 
    return res
  end
 
  def mergesort_iter(array_sliced)
    return array_sliced if array_sliced.length <= 1
 
    mid = array_sliced.length/2 - 1
    left_sorted = mergesort_iter(array_sliced[0..mid])
    right_sorted = mergesort_iter(array_sliced[mid+1..-1])
    return merge(left_sorted, right_sorted)
  end
 
  mergesort_iter(array)
end
#fin mergesort
