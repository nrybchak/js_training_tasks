var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "verify that Home Page url is equal to the https://exadel.com/|PAGE TITLE AND URL VERIFICATION|HOME PAGE",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f936dd3e5248d887b899d220f8267190",
        "instanceId": 173956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538984995794,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538984995811,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538984995836,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538984995858,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://serve.albacross.com/track.js 1:16654 Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
                "timestamp": 1538984996264,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538984996768,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538984996815,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538984996847,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538984996860,
                "type": ""
            }
        ],
        "screenShotFile": "00a40001-0066-00cc-0067-00bf005d0056.png",
        "timestamp": 1538984993303,
        "duration": 5013
    },
    {
        "description": "verify that DevOps elements equal to [Practice, Transformation, Delivery]|DevOps process points contain: |DEVOPS PAGE",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fdde9ac258bd7d9f9a1ab43e42e42743",
        "instanceId": 161976,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538984994608,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538984994608,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538984994662,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538984994668,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538984996791,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538984996821,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538984996857,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538984996868,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538984999456,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538984999500,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538984999525,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538984999536,
                "type": ""
            }
        ],
        "screenShotFile": "003c0001-00c7-006f-00f2-005b008e008f.png",
        "timestamp": 1538984993302,
        "duration": 7639
    },
    {
        "description": "verify that Home Page title is equal to the 'Exadel | Global Enterprise Software & Tech Solutions'|PAGE TITLE AND URL VERIFICATION|HOME PAGE",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f936dd3e5248d887b899d220f8267190",
        "instanceId": 173956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985000633,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985000650,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985000665,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985000679,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985001443,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985001446,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985001464,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985001484,
                "type": ""
            }
        ],
        "screenShotFile": "00270031-00be-008a-0067-008200530000.png",
        "timestamp": 1538984999512,
        "duration": 3433
    },
    {
        "description": "verify that DevOps elements equal to [Practice, Transformation, Delivery]|DevOps process points contain: |DEVOPS PAGE",
        "passed": true,
        "pending": false,
        "sessionId": "36827e9d-21ef-4827-8148-0302cbbbe44e",
        "instanceId": 180812,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002a00ce-0087-00ba-00b4-00d900ec0027.png",
        "timestamp": 1538984996631,
        "duration": 9092
    },
    {
        "description": "Call Us number is visible|Call Us number is valid|HOME PAGE",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f936dd3e5248d887b899d220f8267190",
        "instanceId": 173956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985004352,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985004356,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985004372,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985004381,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.parseJSON requires a valid JSON string\"",
                "timestamp": 1538985004571,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985005052,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985005080,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985005102,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985005153,
                "type": ""
            }
        ],
        "screenShotFile": "00d80042-002d-00b2-00a2-006600290012.png",
        "timestamp": 1538985003771,
        "duration": 2588
    },
    {
        "description": "verify that Home Page url is equal to the https://exadel.com/|PAGE TITLE AND URL VERIFICATION|HOME PAGE",
        "passed": true,
        "pending": false,
        "sessionId": "36827e9d-21ef-4827-8148-0302cbbbe44e",
        "instanceId": 180812,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005400a2-001c-003a-005d-009400ac00b0.png",
        "timestamp": 1538985006318,
        "duration": 3152
    },
    {
        "description": "Call Us number is equal +1 866 843 7411|Call Us number is valid|HOME PAGE",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f936dd3e5248d887b899d220f8267190",
        "instanceId": 173956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985008282,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985008304,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985008343,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985008353,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.parseJSON requires a valid JSON string\"",
                "timestamp": 1538985008612,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985009027,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985009027,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985009047,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985009053,
                "type": ""
            }
        ],
        "screenShotFile": "00f10041-00a9-00a7-0012-002c00550034.png",
        "timestamp": 1538985007206,
        "duration": 3172
    },
    {
        "description": "verify that Home Page title is equal to the 'Exadel | Global Enterprise Software & Tech Solutions'|PAGE TITLE AND URL VERIFICATION|HOME PAGE",
        "passed": true,
        "pending": false,
        "sessionId": "36827e9d-21ef-4827-8148-0302cbbbe44e",
        "instanceId": 180812,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0010000b-0096-0023-00b3-00c700e3007f.png",
        "timestamp": 1538985010234,
        "duration": 2450
    },
    {
        "description": "verify that Services Page title is equal to 'What We Do | About | Exadel'|Services page title is valid: |SERVICES PAGE",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5a345be04084ee5db2045ff3a4a294b7",
        "instanceId": 163460,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985008994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985009004,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985009067,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985009087,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985009804,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985009827,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985009865,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985009878,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985012515,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985012519,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985012540,
                "type": ""
            }
        ],
        "screenShotFile": "005a009d-008f-0012-0006-00250021009d.png",
        "timestamp": 1538985006872,
        "duration": 6493
    },
    {
        "description": "Call Us number is visible|Call Us number is valid|HOME PAGE",
        "passed": true,
        "pending": false,
        "sessionId": "36827e9d-21ef-4827-8148-0302cbbbe44e",
        "instanceId": 180812,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005c0054-00a0-0009-004e-003c002200c6.png",
        "timestamp": 1538985013184,
        "duration": 2349
    },
    {
        "description": "Call Us number is equal +1 866 843 7411|Call Us number is valid|HOME PAGE",
        "passed": false,
        "pending": false,
        "sessionId": "36827e9d-21ef-4827-8148-0302cbbbe44e",
        "instanceId": 180812,
        "browser": {
            "name": "firefox"
        },
        "message": [
            "Expected '+1 720 564 1231' to contain '+1 866'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.it (C:\\Work\\Trainings\\JSAutomation\\training\\hometasks\\hometask_3\\workpice for HT lesson 3\\jasmine_e2e\\smoke\\home_page_spec.js:33:42)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d900c9-00cd-00e9-00d0-00270043007f.png",
        "timestamp": 1538985016018,
        "duration": 2524
    },
    {
        "description": "verify that Description section title is equal to 'What We Do'|Description section title is valid: |SERVICES PAGE",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5a345be04084ee5db2045ff3a4a294b7",
        "instanceId": 163460,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985014933,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985014938,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985014952,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985014960,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.parseJSON requires a valid JSON string\"",
                "timestamp": 1538985015163,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985015486,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985015491,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: Global events are undocumented and deprecated\"",
                "timestamp": 1538985015505,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985015514,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.attrFn is deprecated\"",
                "timestamp": 1538985017486,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.unload() is deprecated\"",
                "timestamp": 1538985017506,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://exadel.com/wp-content/mmr/2961793a-1536914720.min.js 2:262 \"JQMIGRATE: jQuery.fn.load() is deprecated\"",
                "timestamp": 1538985017532,
                "type": ""
            }
        ],
        "screenShotFile": "002300e2-0012-0091-0056-007e00530091.png",
        "timestamp": 1538985014237,
        "duration": 4136
    },
    {
        "description": "verify that Services Page title is equal to 'What We Do | About | Exadel'|Services page title is valid: |SERVICES PAGE",
        "passed": true,
        "pending": false,
        "sessionId": "36827e9d-21ef-4827-8148-0302cbbbe44e",
        "instanceId": 180812,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00790099-00f1-00bd-00f8-00c800b200be.png",
        "timestamp": 1538985018967,
        "duration": 4094
    },
    {
        "description": "verify that Description section title is equal to 'What We Do'|Description section title is valid: |SERVICES PAGE",
        "passed": true,
        "pending": false,
        "sessionId": "36827e9d-21ef-4827-8148-0302cbbbe44e",
        "instanceId": 180812,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007a00c9-00b1-008c-00c9-00a900b400a4.png",
        "timestamp": 1538985023559,
        "duration": 3884
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
