from flask import Flask, render_template, request, abort, Response, jsonify
from smiles import get_molecule_data_from_smiles, MOLECULE_PROPERTIES
from rdkit.Chem import MolFromSmiles, Descriptors, Draw, Crippen, Lipinski, QED
from io import BytesIO
from PIL import Image

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/mol-properties', methods=['GET'])
def mol_properties():
    return jsonify(list(MOLECULE_PROPERTIES.keys())), 200

@app.route('/predictions', methods=['POST'])
def predictions():
    smiles_str = request.json.get('smiles')
    options = request.json.get('options')

    molecule = MolFromSmiles(smiles_str)

    if molecule is None:
        return None
    
    def get_value(value_func):
        return round(value_func(molecule), int(options['precision']))

    mock_prediction = {
        "name": "Prediction Name",
        "image": Draw.MolsToGridImage([molecule], useSVG=True, molsPerRow=1),
        "predictions": {
            "Some Value1": "123.456",
            "Some Value2": "456.789",
            "Some Value3": "1011.12"
        }
    }


    return jsonify([mock_prediction] * 19), 200

# @app.route('/smiles', methods=['POST'])
# def smiles():
#     data = get_molecule_data_from_smiles(request.json.get('smiles'), request.json.get('options'))

#     if data is None:
#         return abort(400)
    
#     return data

# @app.route('/smiles-csv', methods=['POST'])
# def smiles_csv():
#     csv = get_csv_from_smiles(request.json.get('smiles'), request.json.get('options'))
    
#     return Response(
#         csv,
#         mimetype="text/csv",
#         headers={"Content-disposition":"attachment;"}
    # )