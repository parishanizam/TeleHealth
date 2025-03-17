import json
import sys

def create_template(test_type, num_questions):
    template = {
        "questionBankId": "",
        "language": "",
        "testType": "",
        "questions": []
    }

    if test_type == "matching":
        for i in range(num_questions + 1):
            question = {
                "id": i,
                "title": "",
                "sound": "",
                "options": [],
                "correctAnswer": ""
            }
            for opt in ['a', 'b', 'c', 'd']:
                question["options"].append({"id": opt, "image": ""})
            template["questions"].append(question)

    if test_type == "repetition":
        for i in range(num_questions + 1):
            question = {
                "id": i,
                "title": "",
                "sound": "",
            }
            template["questions"].append(question)

    else:
        print("invalid test type, please choose either matching or repetition")
        return 
    
    print("Template created in template.json")
    return template

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python questionsjsontemplate.py <test_type> <number_of_questions>")
        sys.exit(1)
    test_type = sys.argv[1]
    num_questions = int(sys.argv[2])
    template = create_template(test_type, num_questions)
    with open("template.json", "w") as f:
        json.dump(template, f, indent=4)
    