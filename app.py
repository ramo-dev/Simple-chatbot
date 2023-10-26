from flask import Flask, render_template, request, jsonify
from decouple import config

API_KEY = config('API_KEY')

# Import the generativeai module
import google.generativeai as palm

app = Flask(__name__)

# Configure the API key
palm.configure(api_key=API_KEY)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_prompt = request.form['prompt']

    defaults = {
        'model': 'models/chat-bison-001',
        'temperature': 0.25,
        'candidate_count': 1,
        'top_k': 40,
        'top_p': 0.95,
    }
    context = ""
    examples = []
    messages = []
    messages.append(user_prompt)
    response = palm.chat(
        **defaults,
        context=context,
        examples=examples,
        messages=messages
    )
    ai_response = response.last

    return jsonify({'ai_response': ai_response, 'user_prompt': user_prompt})

if __name__ == '__main__':
    app.run(debug=True)
