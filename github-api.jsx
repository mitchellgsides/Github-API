'use strict';

function getResults() {
    fetch(`https://api.github.com/users/${$('#search-terms').val()}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Please enter a valid username.'));
    
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-listing').empty();
    //log all search results
    for(let i = 0; i < responseJson.length; i++) {
    console.log(responseJson[i].name);
    console.log(responseJson[i].html_url)
    }
    //place search into html
    for(let i = 0; i < responseJson.length; i++) {
        $('#results-listing').append(`<li><a href='${responseJson[i].html_url}'>${responseJson[i].name}</a></li>`)
    }
    $('#github-username').text($('#search-terms').val().toLowerCase());

}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        getResults();
        console.log();
    })
}

$(function() {
    console.log('App loaded! Waiting for submit!')
    watchForm();
});