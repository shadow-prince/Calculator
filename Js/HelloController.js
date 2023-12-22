angular.module("myapp", [])

    .controller("HelloController", function ($scope) {

        $scope.helloTo = {};
        $scope.helloTo.title = "Kotheyyyy";
        $scope.documentType = ["Home", "Work", "Telephone", "Mobile"];
        $scope.selectedName = $scope.documentType.value ? 'Mobile' : '';
        $scope.emailRequired = false;
        $scope.Result = "";
        $scope.Answer = 0;
        $scope.dotNotDisabled = true;

        // *****  Functions ***** //
        $scope.myEval = function (Result) {
            $scope.Answer = eval(Result)
        }

        /** POPS OUT THE LAST INDEX VALUE AND CHECKS ENABLE CONDITION FOR BACKSPACE **/
        $scope.backSpace = function () {
            const last = $scope.Result.length
            if ($scope.Result[last - 1] == '.') {
                $scope.dotNotDisabled = true;
            }
            $scope.Result = $scope.Result.substring(0, last - 1);
        }

        /** COPIES THE RESULTING ANSWER TO THE CLIPBOARD ****/
        $scope.copyToClipboard = function () {
            var copyText = document.getElementById("ans");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
            alert("Result Copied: " + copyText.value);
        }

        /** FUNCTION TO ADD DECIMAL[.] **/
        $scope.decimalDot = function () {
            if ($scope.dotNotDisabled) {
                $scope.Result = $scope.Result + '.';
                $scope.dotNotDisabled = false;
            }
        }

        /** DIABLES ALL OTHER UNWANTED KEY EVENTS FOR CLEAN EXPRESSION */
        $scope.validateDecimalPoint = function (event) {
            const keyCode = event.keyCode;
            const excludedKeys = [8, 37, 39, 46, 106, 107, 109, 110, 111,];

            if (!((keyCode >= 48 && keyCode <= 57) ||
                (keyCode >= 96 && keyCode <= 105) ||
                (excludedKeys.includes(keyCode)))) {
                event.preventDefault();
            }
            if (keyCode == 13) {
                $scope.myEval($scope.Result)
            }
        }
    });

/**
 *  const last = $scope.Result.length
        // IF RESULT CONTAINS DOT[.] AND ENDSWITH ANY OPERATOR[*,/,-,+,] AND ZERO[0] SHOULD ALLOW 
        if ($scope.Result.endsWith('0')) {
            $scope.Result = $scope.Result + '.';
        }
        if (!$scope.Result.endsWith('.')) {
            if (parseInt($scope.Result[last - 1])) {
                // cALLOWS DOT IF LAST INDEX CONTAINS NUMBER
                $scope.Result = $scope.Result + '.';
            }
        }

        
   
*  IF THE SUBSTRING STARTING FORM  LAST OPERATOR[*,/,-,+,] AND LAST INDEX CONTAINS MORE ATLEAST ONE DOR
*  THEN DOT IS NOT ALLOWED
      
 */