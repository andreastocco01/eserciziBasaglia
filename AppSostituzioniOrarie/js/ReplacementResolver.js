var tabellone_biennio  = '1HYTQppyaduBdkMLfrmM1esJXvBCbnLQPPv-4d28s2dY';
var tabellone_triennio = '1oa35YMCJQXnvq5dpRnP_1fJDGNJtXIK8rtPHNBuVafw';
var WeekDays = [
    {day: "domenica"},
    {day: "lunedi",    start_col: "C",  end_col: "H",  start_index: 1,  end_index: 7},
    {day: "martedi",   start_col: "I",  end_col: "N",  start_index: 7,  end_index: 13},
    {day: "mercoledi", start_col: "O",  end_col: "T",  start_index: 13, end_index: 19},
    {day: "giovedi",   start_col: "U",  end_col: "Z",  start_index: 19, end_index: 25},
    {day: "venerdi",   start_col: "AA", end_col: "AE", start_index: 25, end_index: 30},
    {day: "sabato",    start_col: "AF", end_col: "AI", start_index: 30, end_index: 34}
];
var professors_range = "B4:B93";
var data_range = "B4:AI93";

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listProfessors(day) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: tabellone_biennio,
        range: data_range,
    }).then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                appendPre(row[0]);
                let start_index = WeekDays[day].start_index;
                let end_index = WeekDays[day].end_index;
                for (j = start_index, hour = 1; j < end_index; j++, hour++) {
                    appendPre(hour + ": " +row[j]);
                }
            }
        } else {
            appendPre('No data found.');
        }
    }, function(response) {
        appendPre('Error: ' + response.result.error.message);
    });
}