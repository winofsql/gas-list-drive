function listDrive() {

    // **************************************************
    // �I�������V�[�g��ΏۂƂ��܂�
    // **************************************************
    var spreadsheet = SpreadsheetApp.getActive();

    // **************************************************
    // ��N���A
    // **************************************************
    spreadsheet.getRange('A:E').activate();
    spreadsheet.getActiveRangeList().clear({contentsOnly: true, commentsOnly: true, skipFilteredRows: true});

    // **************************************************
    // �h���C�u�ꗗ (100���܂�:����ȏ�� nextPageToken ���g��)
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
    // �}�C�h���C�u���[�g���̃t�H���_�̈ꗗ (Drive API �͕K�v�Ȃ�)
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
