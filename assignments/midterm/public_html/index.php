<!DOCTYPE html>
<html ng-app="app">
	<head>
		<title>CS454: Midterm</title>
		
		<!-- META -->
		<meta charset="UTF-8">
		
		<!-- CSS -->
		<link rel="stylesheet" href="./assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="./assets/css/bootstrap-theme.min.css" />
		<link rel="stylesheet" href="./assets/css/style.css" />
		<link rel="stylesheet" href="./assets/css/font-awesome.min.css" />
		
		<!-- JS Library -->
		<script type="text/javascript" src="./assets/js/libraries/jquery-2.1.1.min.js"></script>
		<script type="text/javascript"src="./assets/js/libraries/angular.min.js"></script>
		<script type="text/javascript" src="./assets/js/libraries/bootstrap.min.js"></script>
		<script type="text/javascript" src="./assets/js/libraries/ui-bootstrap-tpls-0.11.2.min.js"></script>
		
		<!-- Angular App Declaration -->
		<script type="text/javascript" src="./assets/js/app.js"></script>
	</head>
	<body ng-controller="Controller">
		<div class="container-fluid col-lg-12">
			<div class="page-header col-lg-12">
				<h1>
					Mongoose <small>CS454</small>
				</h1>
				<small><strong>Project Membersy: </strong>Pablo, David, Ali, Cliff</small>
			</div>
			
			<div class="col-lg-12">
				<tabset>
					<tab ng-repeat="tab in tabs" heading="{{tab.header}}">
						<div class="col-md-12" ng-bind-html="getContent(tab)"></div>
					</tab>		
				</tabset>
			</div>
			
			<div class="col-lg-12">
				<a href="javascript:jQuery(document).scrollTop(0);">Top</a>
			</div>
			
			<div class="col-lg-12" style="height: 50px;">
				<!-- Screen Spacing -->
				&nbsp;
			</div>
	</body>
</html>
