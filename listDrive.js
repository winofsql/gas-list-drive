function listDrive() {

    // **************************************************
    // 選択したシートを対象とします
    // **************************************************
    var spreadsheet = SpreadsheetApp.getActive();

    // **************************************************
    // 列クリア
    // **************************************************
    spreadsheet.getRange('A:E').activate();
    spreadsheet.getActiveRangeList().clear({contentsOnly: true, commentsOnly: true, skipFilteredRows: true});

    // **************************************************
    // ドライブ一覧 (100件まで:それ以上は nextPageToken を使う)
    // Drive API v2
    // **************************************************
    var response = Drive.Drives.list({"maxResults":100});
    var drives = response.items;
    var targetRange;
    for (i = 0; i < drives.length; i++) {

        Logger.log('%s (%s)', drives[i].name, drives[i].id);
        targetRange = spreadsheet.getRange('A' + (i+1));
        targetRange.setValue(drives[i].name);
        targetRange = spreadsheet.getRange('B' + (i+1));
        targetRange.setValue(drives[i].id);

    }

    // **************************************************
    // マイドライブルート内のフォルダの一覧 (Drive API は必要ない)
    // **************************************************
    var folders = DriveApp.getRootFolder().getFolders();
    var a = new Array();

    while (folders.hasNext()) {
        var folder = folders.next(); 
        Logger.log(folder.getName());
        a.push(folder.getName());
    }

    a.sort()
    for (i = 0; i < a.length; i++) {
        targetRange = spreadsheet.getRange('E' + (i+1));
        targetRange.setValue(a[i]);
    }

}
