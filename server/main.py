from flask import Flask, jsonify, render_template, send_file, Response, redirect
import requests
from flask_cors import CORS, cross_origin
import json as json_lib

app = Flask(__name__)
cors = CORS(app)

global urls
urls = []

class Scrolller:
    def __init__(self, subreddit, url):
        self.subreddit = subreddit
        self.url = url
        self.headers = {
            "Host": "api.scrolller.com",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": "https://scrolller.com/",
            "Content-Type": "text/plain;charset=UTF-8",
            "Origin": "https://scrolller.com",
            "DNT": "1",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
        }
        self.query = """{
            "query": "query SubredditQuery( $url: String! $filter: SubredditPostFilter $iterator: String ) { getSubreddit(url: $url) { children( limit: 100 iterator: $iterator filter: $filter ) { iterator items { __typename url title subredditTitle subredditUrl redditPath isNsfw albumUrl isFavorite mediaSources { url width height isOptimized } } } } }",
            "variables": {
                "url": "%s",
                "filter": null
                },
                "authorization": null
                }""" % ('/' + subreddit)

    def request(self):
        self.request_obj = requests.post(self.url, data=self.query, headers=self.headers)
        self.json_obj = self.request_obj.json()
        # print(self.json_obj)
        return self.json_obj

def load():
    print("load")
    sc = Scrolller("lenapaul", "https://api.scrolller.com/api/v2/graphql")
    json = sc.request()['data']['getSubreddit']['children']['items']
    # with open('test.json', 'w') as f:
    #     f.write(json_lib.dumps(json))
    global urls
    urls = [i['mediaSources'][-1]['url'] for i in json ][:10]
    # print(urls)
    # print(json)
    # urls_old = [i['mediaSources'][0]['url'] if i['mediaSources'][0]['url'].endswith('.jpg') else None for i in json ]
    # global urls
    # urls = []
    # for i in urls_old:
    #     if i is not None:
    #         urls.append(i)
    # print("load", urls)
    # for i in urls_old:
    #     print(i)

load()

@app.route('/')
@cross_origin()
def index():
    # return jsonify(urls)
    return render_template("index.html", urls=urls)
    # return render_template("index.html")

@app.route('/dev/favicon.ico')
@cross_origin()
def favicon():
    return send_file("favicon.png")

@app.route('/dev/images')
@cross_origin()
def images():
    # print("images", urls)
    return jsonify(urls)

@app.route('/dev/reload')
@cross_origin()
def reload():
    load()
    return Response(status=201)
    # return redirect("/")

if __name__ == '__main__':
    # sc = Scrolller("LenaPaul", "https://api.scrolller.com/api/v2/graphql")
    # json = sc.request()['data']['getSubreddit']['children']['items']
    # # print(json)
    # urls_old = [i['mediaSources'][0]['url'] if i['mediaSources'][0]['url'].endswith('.jpg') else None for i in json ]
    # urls = []
    # for i in urls_old:
    #     if i is not None:
    #         urls.append(i)
    # # for i in urls:
    # #     print(i)
    #     # print()
    # # print(len(urls_new))
    app.run(debug=True)
