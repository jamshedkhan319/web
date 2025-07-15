// Data Storage
const data = {
    passwords: ["jk", "23456"], // Allowed passwords
    websites: [
        { name: "bigcashweb repar", url: "https://bigcashweb.com/refer/bzbpalyk"},
        { name: "Facebook", url: "https://www.facebook.com" },
        { name: "YouTube", url: "https://www.youtube.com" }
    ],
    codeSnippets: {
        html: "<!-- Enter your HTML code here -->\n<div>\n  <h1>Hello World!</h1>\n</div>",
        css: "/* Enter your CSS code here */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 0;\n}",
        js: "// Enter your JavaScript code here\nfunction hello() {\n  alert('Hello World!');\n}"
    },
    apps: [
        { 
            name: "Weather App", 
            logo: "weather-app.png", 
            apk: "weather-app.apk"
        },
        { 
            name: "Calculator", 
            logo: "calculator-app.png", 
            apk: "calculator.apk"
        },
        { 
            name: "Notes App", 
            logo: "notes-app.png", 
            apk: "notes-app.apk"
        }
    ],
    files: [
        { 
            name: "HTML Template", 
            type: "html",
            file: "template.html.zip" 
        },
        { 
            name: "CSS Stylesheet", 
            type: "css",
            file: "styles.css.zip"
        },
        { 
            name: "JavaScript File", 
            type: "js",
            file: "script.js.zip"
        },
        { 
            name: "Theme Pack", 
            type: "zip",
            file: "theme-pack.zip"
        },
        { 
            name: "Documentation", 
            type: "pdf",
            file: "documentation.pdf"
        }
    ]
};

// DOM Elements
const loginContainer = document.getElementById('login-container');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const contentArea = document.getElementById('content-area');
const featureBtns = document.querySelectorAll('.feature-btn');

// Initialize
dashboard.style.display = 'none';

// Login Functionality (password only)
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    
    // Check password
    if (data.passwords.includes(password)) {
        // Successful login
        loginContainer.style.display = 'none';
        dashboard.style.display = 'flex';
        showWelcomeMessage();
    } else {
        alert('Invalid password');
    }
});

// Logout Functionality
logoutBtn.addEventListener('click', function() {
    dashboard.style.display = 'none';
    loginContainer.style.display = 'flex';
    loginForm.reset();
});

// Feature Buttons Functionality
featureBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const feature = this.getAttribute('data-feature');
        showFeatureContent(feature);
    });
});

// Show Welcome Message
function showWelcomeMessage() {
    contentArea.innerHTML = `
        <div class="welcome-message">
            <h2>Welcome to Admin Dashboard</h2>
            <p>Please select a feature from the buttons above</p>
        </div>
    `;
}

// Show Feature Content
function showFeatureContent(feature) {
    let content = '';
    
    switch(feature) {
        case 'websites':
            content = showWebsites();
            break;
        case 'code-editor':
            content = showCodeEditor();
            break;
        case 'apps':
            content = showApps();
            break;
        case 'files':
            content = showFiles();
            break;
        case 'empty':
            content = showEmptyFeature();
            break;
        default:
            content = showWelcomeMessage();
    }
    
    contentArea.innerHTML = content;
    
    // Add event listeners for dynamic elements
    if (feature === 'websites') {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', copyToClipboard);
        });
        
        document.querySelectorAll('.open-btn').forEach(btn => {
            btn.addEventListener('click', openWebsite);
        });
    }
    
    if (feature === 'code-editor') {
        document.getElementById('copy-html').addEventListener('click', () => copyCode('html'));
        document.getElementById('copy-css').addEventListener('click', () => copyCode('css'));
        document.getElementById('copy-js').addEventListener('click', () => copyCode('js'));
        
        document.getElementById('download-html').addEventListener('click', () => downloadCode('html'));
        document.getElementById('download-css').addEventListener('click', () => downloadCode('css'));
        document.getElementById('download-js').addEventListener('click', () => downloadCode('js'));
        
        document.getElementById('html-code').addEventListener('input', updateCode);
        document.getElementById('css-code').addEventListener('input', updateCode);
        document.getElementById('js-code').addEventListener('input', updateCode);
    }
    
    if (feature === 'apps') {
        document.querySelectorAll('.download-apk').forEach(btn => {
            btn.addEventListener('click', downloadApk);
        });
    }
    
    if (feature === 'files') {
        document.querySelectorAll('.download-file').forEach(btn => {
            btn.addEventListener('click', downloadFile);
        });
    }
}

// Websites Feature
function showWebsites() {
    let websitesHTML = data.websites.map(website => `
        <div class="website-card">
            <div class="website-name">${website.name}</div>
            <div class="website-url">${website.url}</div>
            <div class="website-actions">
                <button class="action-btn copy-btn" data-url="${website.url}">Copy</button>
                <button class="action-btn open-btn" data-url="${website.url}">Open</button>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="feature-content">
            <h3>Website Links</h3>
            <div class="website-list">
                ${websitesHTML}
            </div>
        </div>
    `;
}

// Code Editor Feature
function showCodeEditor() {
    return `
        <div class="feature-content">
            <h3>Code Editor</h3>
            <div class="code-editor-container">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="editor-title">HTML</div>
                        <div class="editor-actions">
                            <button class="action-btn copy-btn" id="copy-html">Copy</button>
                            <button class="action-btn download-btn" id="download-html">Download</button>
                        </div>
                    </div>
                    <textarea class="editor-textarea" id="html-code">${data.codeSnippets.html}</textarea>
                </div>
                
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="editor-title">CSS</div>
                        <div class="editor-actions">
                            <button class="action-btn copy-btn" id="copy-css">Copy</button>
                            <button class="action-btn download-btn" id="download-css">Download</button>
                        </div>
                    </div>
                    <textarea class="editor-textarea" id="css-code">${data.codeSnippets.css}</textarea>
                </div>
                
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="editor-title">JavaScript</div>
                        <div class="editor-actions">
                            <button class="action-btn copy-btn" id="copy-js">Copy</button>
                            <button class="action-btn download-btn" id="download-js">Download</button>
                        </div>
                    </div>
                    <textarea class="editor-textarea" id="js-code">${data.codeSnippets.js}</textarea>
                </div>
            </div>
        </div>
    `;
}

// Apps Feature
function showApps() {
    let appsHTML = data.apps.map(app => `
        <div class="app-card">
            <div class="app-logo">
                <img src="${app.logo}" alt="${app.name}" onerror="this.onerror=null;this.src='default-app-icon.png'">
            </div>
            <div class="app-name">${app.name}</div>
            <button class="download-apk" data-apk="${app.apk}">Download APK</button>
        </div>
    `).join('');
    
    return `
        <div class="feature-content">
            <h3>Apps</h3>
            <div class="apps-list">
                ${appsHTML}
            </div>
        </div>
    `;
}

// Files Feature
function showFiles() {
    let filesHTML = data.files.map(file => `
        <div class="file-card">
            <div class="file-icon">${getFileIcon(file.type)}</div>
            <div class="file-name">${file.name}</div>
            <button class="download-file" data-file="${file.file}">Download</button>
        </div>
    `).join('');
    
    return `
        <div class="feature-content">
            <h3>Files</h3>
            <div class="files-list">
                ${filesHTML}
            </div>
        </div>
    `;
}

// Empty Feature
function showEmptyFeature() {
    return `
        <div class="feature-content empty-feature">
            <i class="fas fa-plus-circle"></i>
            <h3>Empty Feature</h3>
            <p>This feature is currently empty. You can add content later.</p>
        </div>
    `;
}

// Helper Functions
function getFileIcon(type) {
    const icons = {
        html: '<i class="fab fa-html5"></i>',
        css: '<i class="fab fa-css3-alt"></i>',
        js: '<i class="fab fa-js-square"></i>',
        zip: '<i class="fas fa-file-archive"></i>',
        pdf: '<i class="fas fa-file-pdf"></i>'
    };
    return icons[type] || '<i class="fas fa-file"></i>';
}

function copyToClipboard(e) {
    const url = e.target.getAttribute('data-url');
    navigator.clipboard.writeText(url)
        .then(() => {
            alert('URL copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

function openWebsite(e) {
    const url = e.target.getAttribute('data-url');
    window.open(url, '_blank');
}

function copyCode(type) {
    const code = document.getElementById(`${type}-code`).value;
    navigator.clipboard.writeText(code)
        .then(() => {
            alert(`${type.toUpperCase()} code copied to clipboard!`);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

function downloadCode(type) {
    const code = document.getElementById(`${type}-code`).value;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function updateCode() {
    data.codeSnippets.html = document.getElementById('html-code').value;
    data.codeSnippets.css = document.getElementById('css-code').value;
    data.codeSnippets.js = document.getElementById('js-code').value;
}

function downloadApk(e) {
    const apkFile = e.target.getAttribute('data-apk');
    const blob = new Blob([`Simulated content for ${apkFile}`], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = apkFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(`Downloading ${apkFile}`);
}

function downloadFile(e) {
    const fileName = e.target.getAttribute('data-file');
    const fileType = fileName.endsWith('.zip') ? 'application/zip' : 
                    fileName.endsWith('.pdf') ? 'application/pdf' : 
                    'application/octet-stream';
    
    const blob = new Blob([`Simulated content for ${fileName}`], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(`Downloading ${fileName}`);
}
