from flask import Flask, render_template, request, flash, send_from_directory
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

portfolio_data = {
    'name': 'MD NOMAN',
    'about': 'Welcome to my portfolio! I am a postgraduate student pursuing M.Tech in Computer Science and Engineering from IIT Bombay under the TA (Teaching Assistantship) category. I am from Rajasthan and completed my B.Tech in Mechanical Engineering from NIT Calicut. I love coding, problem-solving, and learning new things',
    'skills': ['C', 'C++', 'Python', 'Flask', 'HTML/CSS', 'JavaScript', 'SQL', 'React', 'Node.JS', 'mongoDB'],
    'education': [
        {
            'degree': '10th Grade',
            'school': 'Central Children Academy Sr Sec School',
            'board' : 'RBSE',
            'year': '2016-2017',
            'Score': '82.5%'
        },
        {
            'degree': '12th Grade',
            'school': 'Aakash Academy Sr Sec School',
            'board' : 'RBSE',
            'year': '2018-2019',
            'Score': '84.4%'
        },
        {
            'degree': 'B.Tech',
            'University': 'National Institute of Technology, Calicut',
            'year': '2020-2024',
            'Branch': 'Mechanical Engineering',
            'Score': '7.97 CGPA'
        },
        {
            'degree': 'M.Tech',
            'University': 'Indian Institute of Technology, Bombay',
            'year': '2025-2027',
            'Branch': 'Computer Science and Engineering',
            'Score': 'Present'
        },
    ],

    'projects': [
        {
            'title': 'Battleship Game',
            'description': 'Battleship game where players click on cells to reveal either a battleship or water. ',
            'technologies': ['HTML', 'CSS', 'JavaScript'],
            'folder': 'battleship_game'
        },
        {
            'title': 'Currency Converter',
            'description': 'Real-time currency conversion tool.',
            'technologies': ['HTML', 'CSS', 'JavaScript', 'API'],
            'folder': 'currency_convertor'
        },
        {
            'title': 'Password Generator',
            'description': 'Generate secure random passwords with custom options.',
            'technologies': ['HTML', 'CSS', 'JavaScript'],
            'folder': 'password_generator'
        },
        {
            'title': 'Tic Tac Toe',
            'description': 'Classic game with interactive gameplay.',
            'technologies': ['HTML', 'CSS', 'JavaScript'],
            'folder': 'tic_tac_toe'
        },
        {
            'title': 'Wordle Game',
            'description': 'Popular word guessing game.',
            'technologies': ['HTML', 'CSS', 'JavaScript'],
            'folder': 'wordle'
        }
    ]
}


@app.route('/')
def index():
    return render_template('index.html', data=portfolio_data)

@app.route('/about')
def about():
    return render_template('about.html', data=portfolio_data)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        flash(f'Thank you {name}! Your message has been sent.', 'success')
        return render_template('contact.html', data=portfolio_data)
    
    return render_template('contact.html', data=portfolio_data)

@app.route('/projects/<project_name>')
def show_project(project_name):
    project_folders = [project['folder'] for project in portfolio_data['projects']]
    if project_name in project_folders:
        folder_path = os.path.join('static', 'projects', project_name)
        return send_from_directory(folder_path, 'index.html')
    else:
        return f"Project not found: {project_name}", 404

@app.route('/projects/<project_name>/<path:filename>')
def serve_project_assets(project_name, filename):
    project_folders = [project['folder'] for project in portfolio_data['projects']]
    if project_name in project_folders:
        folder_path = os.path.join('static', 'projects', project_name)
        return send_from_directory(folder_path, filename)
    else:
        return "Project asset not found", 404

if __name__ == '__main__':
    app.run(debug=True)