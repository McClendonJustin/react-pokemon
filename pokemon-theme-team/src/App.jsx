import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  let types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'stellar', 'unknown']

  const getPokemonDetails = async(url) => {
    let response = await axios.get(url)
    return {
      img : response.data.sprites.front_default,
      name : response.data.name
    }
  }

  const insertCard = (pokemonData) => {
    let {name, img} = pokemonData
    let card = document.createElement('div')
    let h6 = document.createElement('h6')
    let imgElement = document.createElement('img')
    imgElement.src = img
    h6.innerText = name
    card.appendChild(imgElement)
    card.appendChild(h6)
    card.className = 'card'
    let container = document.getElementById('container')
    container.appendChild(card)
  }

  const getPokemonByType = async () => {
    let randomIdx = Math.floor(Math.random()*types.length)
    let selectedType = types[randomIdx]
    // console.log(randomIdx)
    let resp = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}/`)
    let pokemon = resp.data.pokemon.slice(0, 6)
    // console.log(pokemon)
    let teamData = await Promise.all(pokemon.map(async (poke) => await getPokemonDetails(poke.pokemon.url)))
    // console.log(teamData)
    teamData.map((data) => insertCard(data))
  }

  return (
    <>
      <header>
        <h1>Pokemon Theme Team</h1>
      </header>
      <button onClick={getPokemonByType}>Get Team</button>
      <div id='container' style={{display: "flex", flexWrap: "wrap", gap: "2vmin"}}>

      </div>
    </>
  )
}

export default App
