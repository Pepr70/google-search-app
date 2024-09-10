function saveResults(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'results.json';
    link.click();
}

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const query = document.getElementById('query').value;
    const apiKey = 'TVÙJ_API_KLÍÈ'; 
    const cx = 'TVÙJ_CX';
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let results = data.items;
            let output = '<h2>Výsledky vyhledávání:</h2><ul>';
            
            results.forEach(item => {
                output += `
                    <li>
                        <a href="${item.link}" target="_blank">${item.title}</a>
                        <p>${item.snippet}</p>
                    </li>
                `;
            });
            
            output += '</ul>';
            document.getElementById('results').innerHTML = output;


            saveResults(results);
        })
        .catch(error => console.error('Error:', error));
});
