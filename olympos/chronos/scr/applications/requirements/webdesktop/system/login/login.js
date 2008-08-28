Ext.SSL_SECURE_URL="resources/images/default/s.gif"; 
Ext.BLANK_IMAGE_URL="resources/images/default/s.gif";

Login = function(){
	var win,
		form,
		submitUrl = 'system/login/login.php';
		
	function onSubmit(){
		this.showMask();
		
		form.submit({
			reset: true
		});
	}
	
	return{
		Init:function(){
			Ext.QuickTips.init();
			
			var logoPanel = new Ext.Panel({
				baseCls: 'x-plain',
				id: 'login-logo',
		        region: 'center'
			});
			
			var formPanel = new Ext.form.FormPanel({
		        baseCls: 'x-plain',
		        baseParams: {
		        	module: 'login'
		        },
		        defaults: {
		        	width: 200
		        },
		        defaultType: 'textfield',
		        frame: false,
		        height: 70,
		        id: 'login-form',
		        items: [{
		            fieldLabel: 'Email Address',
		            name: 'user',
		            value: 'demo'
		        },{
		            fieldLabel: 'Password',
		            inputType: 'password',
		            name: 'pass',
		            value: 'demo'
		        }],
		        labelWidth:115,
		        listeners: {
					'actioncomplete': {
						fn: this.onActionComplete,
						scope: this
					},
					'actionfailed': {
						fn: this.onActionFailed,
						scope: this
					}
				},
		        region: 'south',
		        url: submitUrl
		    });
		
		   win = new Ext.Window({
		        buttons: [{
		        	handler: onSubmit,
		        	scope: Login,
		            text: 'Login'
		        }],
		        buttonAlign: 'right',
		        closable: false,
		        draggable: false,
		        height: 250,
		        id: 'login-win',
		        keys: {
		        	key: [13], // enter key
			        fn: onSubmit,
			        scope:this
		        },
		        layout: 'border',
		        minHeight: 250,
		        minWidth: 430,
		        plain: false,
		        resizable: false,
		        items: [
		        	logoPanel,
		        	formPanel
		        ],
				title: 'Login',
		        width: 430
		    });
			
			form = formPanel.getForm();
			
			formPanel.on('render', function(){
				var f = form.findField('user');
				
				if(f){
					f.focus();
				}
			}, this, {delay: 200});
			
		    win.show();
		},
		
		hideMask : function(){
			this.pMask.hide();
			win.buttons[0].enable();
		},
		
		onActionComplete : function(f, a){
			this.hideMask();
			if(a && a.result){
				win.destroy(true);
				
				// get the path
				var path = window.location.pathname,
					path = path.substring(0, path.lastIndexOf('/') + 1);
					
				// set the cookie
				set_cookie('sessionId', a.result.sessionId, '', path, '', '' );
				
				// redirect the window
				window.location = path;
			}
		},
		
		onActionFailed : function(){
			this.hideMask();
		},
		
		showMask : function(msg){
			if(!this.pMask){
				// using this.pMask, seems that using this.mask caused conflict
		        // when this dialog is modal (uses this.mask also)
		        this.pMask = new Ext.LoadMask(win.body, {
		        	msg: 'Please wait...'
		        });
			}
			
			if(msg){
				this.pMask.msg = msg;
			}
	    	this.pMask.show();
	    	win.buttons[0].disable();
	    }
	};
}();

Ext.onReady(Login.Init, Login, true);