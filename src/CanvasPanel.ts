import * as vscode from "vscode";
import {getNonce} from './getNonce';

export class CanvasPanel {
  public static currentPanel: CanvasPanel | undefined;

  public static readonly viewType = "hello-world";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;    

    // If we already have a panel, show it.
    if (CanvasPanel.currentPanel) {
      CanvasPanel.currentPanel._panel.reveal(column);
      CanvasPanel.currentPanel._update();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      CanvasPanel.viewType,
      "Canvas",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,

        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "FontAwesome"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],
      }
    );

    CanvasPanel.currentPanel = new CanvasPanel(panel, extensionUri);
  }

  public static kill() {
    if(CanvasPanel.currentPanel){
      CanvasPanel.currentPanel.dispose();
    }
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    CanvasPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.js")
    );

    const stylesResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const stylesFontAwesomeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "FontAwesome/css", "all.min.css")
    );
    const stylesMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "style.css")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy"
        content="default-src 'none';  img-src ${webview.cspSource} https:; font-src ${webview.cspSource} https:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesFontAwesomeUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
			</head>
      <body>
      <div>
          <canvas id="canvas">Your browser does not support canvas element.</canvas>
      </div>
      <div id="control">
          <div class="container">
              <h1 class="heading">Canvass</h1>
              <h2 class="subheading">Canvas created by <a href="https://github.com/ishaansaxena/CanvassPaintApp">Ishaan Saxena</a></h2><!--
           --><div class="control-box">
                  <div class="control-header">Toolkit</div>
                  <div id="tools" class="control-tools">
                  </div>
              </div><!--
           --><div class="control-box brush">
              <div class="control-header">Brush Settings</div>
                  <div class="brush">
                      <div class="control-inner">
                          <div class="item1" style="margin-top:10px!important">Size
                              <input id="brush" type="text" value="5"/>
                          </div>
                          <div class="item2" style="margin-top:10px!important">Color
                              <input id="color" type="text" value="#00B16A"/>
                          </div>
                          <div class="item3" style="margin-top:10px!important">Alpha
                              <input id="alpha" type="text" value="1.0"/>
                          </div>
                      </div>
                  </div>
              </div><!--
           --><div class="control-box palette">
                  <div class="control-header">Palette</div>
                  <div id="paints" class="control-paints">
                  </div>
              </div>
          </div>
      </div>
      </body>
      <script src="${scriptUri}" nonce="${nonce}">
			</html>`;
  }
}
