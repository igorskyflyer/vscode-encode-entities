// Author: Igor Dimitrijević (@igorskyflyer)

import { Encoder } from '@igor.dvlpr/encode-entities'
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.encodeInSelection', () => {
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor

      if (!editor) {
        return
      }

      const selections: readonly vscode.Selection[] = editor.selections
      const selectionsCount: number = selections.length

      if (selectionsCount < 1) {
        return
      }

      editor.edit((editBuilder: vscode.TextEditorEdit) => {
        for (let i = 0; i < selectionsCount; i++) {
          const selection: vscode.Selection = selections[i]
          const selectionRange = new vscode.Range(
            selection.start.line,
            selection.start.character,
            selection.end.line,
            selection.end.character
          )
          const selected: string = editor.document.getText(selectionRange)
          const encoder: Encoder = new Encoder()
          const encoded: string = encoder.encode(selected)

          if (selected !== encoded) {
            editBuilder.replace(selectionRange, encoded)
          }
        }
      })
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.encodeFile', () => {
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor

      if (!editor) {
        return
      }

      const file: string = editor.document.getText()
      const encoder: Encoder = new Encoder()
      const encoded: string = encoder.encode(file)

      if (file !== encoded) {
        editor.edit((editBuilder: vscode.TextEditorEdit) => {
          const fileRange = new vscode.Range(
            editor.document.positionAt(0),
            editor.document.positionAt(file.length)
          )

          editBuilder.replace(fileRange, encoded)
        })
      }
    })
  )
}

export function deactivate() {}
