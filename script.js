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
        })
        .catch(error => console.error('Error:', error));
});

