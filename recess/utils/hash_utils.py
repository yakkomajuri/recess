import hashlib

def generate_md5_hash(input_string):
    input_bytes = input_string.encode('utf-8')
    md5_hasher = hashlib.md5()
    md5_hasher.update(input_bytes)
    return md5_hasher.hexdigest()