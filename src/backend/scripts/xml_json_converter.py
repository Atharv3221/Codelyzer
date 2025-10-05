import xml.etree.ElementTree as ET
import json
import sys


def element_to_dict(element):
    """
    Recursively converts an XML ElementTree element and its children into a dictionary.
    Handles attributes, text content, and nested elements.
    """
    node = {}

    # 1. Handle Attributes
    if element.attrib:
        node['@attributes'] = element.attrib

    # 2. Handle Text Content
    text = (element.text or '').strip()
    if text:
        node['#text'] = text

    # 3. Handle Children (Nested Elements)
    for child in element:
        tag = child.tag
        child_dict = element_to_dict(child)

        if tag in node:
            # If the tag is already present, convert the value to a list
            if isinstance(node[tag], list):
                node[tag].append(child_dict)
            else:
                node[tag] = [node[tag], child_dict]
        else:
            # First occurrence of the tag
            node[tag] = child_dict

    # Clean up structure if only one child key exists (e.g., only text or only attributes)
    if len(node) == 1 and '#text' in node and not element.attrib and len(list(element)) == 0:
        return node['#text']

    return node


def convert_xml_to_json(repo_name):
    """
    Parses an XML file named <repo_name>.xml and saves the converted JSON structure 
    to a file named <repo_name>.json.
    """
    # 1. Define input and output paths based on repo_name
    input_xml_path = f"./../temp_analysis/{repo_name}.xml"
    output_json_path = f"./../temp_analysis/{repo_name}.json"

    try:
        # Parse the XML file
        tree = ET.parse(input_xml_path)
        root = tree.getroot()

        # Convert the entire XML tree to a dictionary
        data_dict = {root.tag: element_to_dict(root)}

        # Write the dictionary to a JSON file
        with open(output_json_path, 'w', encoding='utf-8') as json_file:
            json.dump(data_dict, json_file, indent=4)

        print(
            f"Successfully converted '{input_xml_path}' to '{output_json_path}'.")

    except FileNotFoundError:
        print(
            f"Error: Input file '{input_xml_path}' not found.", file=sys.stderr)
        sys.exit(1)
    except ET.ParseError as e:
        print(
            f"Error: Invalid XML format in '{input_xml_path}'. Details: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python xml_to_json.py <repo_name>", file=sys.stderr)
        sys.exit(1)

    repo_name = sys.argv[1]

    convert_xml_to_json(repo_name)
