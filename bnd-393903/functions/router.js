const router = require('express').Router();
const { byName, byYear } = require('us-baby-names-2');

// Transform the data object elements into an
// HTML table
const formatToHTML = function (dataArr) {
    // If dataArr is undefined or null, make an empty array
    if (!dataArr) {
        dataArr = [];
    }
    // Use the Array.map function to convert each record 
    // into an HTML table element.
    dataArr = dataArr.map(item => {
        // Create the HTML here
        let html = '<tr>'
        html += (item.year) ? '<td>' + item.year + '</td>' : '';
        html += (item.name) ? '<td>' + item.name + '</td>' : '';
        html += (item.sex) ? '<td>' + item.sex + '</td>' : '';
        html += (item.count) ? '<td>' + item.count + '</td>' : '';
        html += '</tr>';
        return html
    })
    // Now join all the elements together inside the 
    // <table><tbody> elements.
    return '<table><tbody>' +
        dataArr.join('') + '</tbody></table>';
}

// Transform name with first character capitalized and the 
// rest lower case
const fixName = function (name) {
    let newName = name.toLowerCase();
    newName = newName.charAt(0).toUpperCase() +
        newName.substr(1)
    return newName
}


// Path 1: /baby-name/<name>
router.get('/baby-name/:name', function (req, res) {
    let data = byName[fixName(req.params.name)];
    res.send(formatToHTML(data));
})

router.get('/baby-name/:name/:year', function (req, res) {
    let data = (byName[fixName(req.params.name)]);
    data = data.filter(data => data.year == req.params.year);
    res.send(formatToHTML(data));
})

router.get('/baby-name/:name/after/:year', function (req, res) {
    let data = (byName[fixName(req.params.name)]);
    data = data.filter(data => data.year > req.params.year);
    res.send(formatToHTML(data));
})

router.get('/baby-name/:name/before/:year', function (req, res) {
    let data = (byName[fixName(req.params.name)]);
    data = data.filter(data => data.year < req.params.year);
    res.send(formatToHTML(data));
})

router.get('/baby-year/:year', function (req, res) {
    let data = byYear[req.params.year];
    res.send(formatToHTML(data));
})

router.get('/baby-year/:year/:name', function (req, res) {
    let data = byYear[req.params.year];
    data = data.filter(data => data.name == req.params.name)
    res.send(formatToHTML(data));
})

router.get('/baby-year-start/:year/:letter', function (req, res) {
    let data = byYear[req.params.year];
    data = data.filter(data => data.name.substring(0,1).toLowerCase() == req.params.letter.toLowerCase());
    res.send(formatToHTML(data));
})

router.get('/baby-year-end/:year/:letter', function (req, res) {
    let data = byYear[req.params.year];
    data = data.filter(data => data.name.substr(data.name.length-1) == req.params.letter)
    res.send(formatToHTML(data));
})

module.exports = router;
