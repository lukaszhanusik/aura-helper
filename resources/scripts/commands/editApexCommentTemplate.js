const snippetUtils = require("../utils/snippetUtils");
const vscode = require('vscode');
const fileSystem = require('../fileSystem');
const window = vscode.window;
const FileChecker = fileSystem.FileChecker;
const Paths = fileSystem.Paths;
const FileWriter= fileSystem.FileWriter;

exports.run = function() {
    try {
        let templatePath = Paths.getApexCommentUserTemplatePath();
        if (!FileChecker.isExists(templatePath)) {
            FileWriter.createFile(templatePath, snippetUtils.getApexCommentBaseTemplate(), onFileCreated);
        } else {
            window.showTextDocument(Paths.asUri(templatePath));
        }
    }
    catch (error) {
        window.showErrorMessage('An error ocurred while processing command. Error: \n' + error);
    }
}

function onFileCreated(fileCreated, error) {
    if (fileCreated)
        window.showTextDocument(Paths.asUri(fileCreated));
    else
        window.showErrorMessage("An error ocurred while creating template. Error: \n" + error);
}