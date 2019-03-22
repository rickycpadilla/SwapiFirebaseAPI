const functions = require('firebase-functions')
const express = require('express')
const app = express()

const baseUrl = 'https://swapi.co/api'

const getPeople = (callback: (json: any)=> any, errorCallback: (error: any)=> any) => {
    fetch(`${baseUrl}/people`, {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson)
    })
    .catch((error) => {
        errorCallback(error)
    })
}

const getPerson = (personNumber: string, callback: (json: any)=> any, errorCallback: (error: any)=> any) => {
    fetch(`${baseUrl}/people/${personNumber}`, {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson)
    })
    .catch((error) => {
        errorCallback(error)
    })
}

app.get('/people', function(req, res) {
    const successCallback = (json: any) => {
        const results = json.results.slice(0, 10)
        res.send(results)
    }

    const errorCallback = (error: any) => {
        res.send(new Error('There was a problem.'))
    }

    getPeople(successCallback, errorCallback)
})
