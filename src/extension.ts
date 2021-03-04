import * as vscode from "vscode";
import { CanvasPanel } from "./CanvasPanel";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("canvas.start", () => {
      CanvasPanel.createOrShow(context.extensionUri);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("canvas.refresh", async () => {
      CanvasPanel.kill();
      CanvasPanel.createOrShow(context.extensionUri);
    })
  );
}

export function deactivate() {}
