// Author: Igor Dimitrijević (@igorskyflyer)

import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('ext.sayHello', () => {
      vscode.window.showInformationMessage('Hello World')
    })
  )
}

export function deactivate() {}
