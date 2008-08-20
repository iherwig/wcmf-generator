/**
 * @author Giuseppe
 */
Ext.onReady(function(){
 
	var simple = new Ext.form.FormPanel({
 
        standardSubmit: true,
         frame:true,
        title: 'Login',
 
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',
		items: [{
                fieldLabel: 'Username',
                name: 'login',
                allowBlank:false
            },{
               inputType:'password',
			    fieldLabel: 'Password',
                name: 'password',
                allowBlank:false
            },
			{
                inputType: 'hidden',
                id: 'controller',
                name: 'controller',
                value: 'LoginController'
            },
			{
                inputType: 'hidden',
                id: 'context',
                name: 'context',
                value: 'cms'
            },
			{
                inputType: 'hidden',
                id: 'usr_action',
                name: 'usr_action',
                value: 'login'
            },
			{
                inputType: 'hidden',
                id: 'response_format',
                name: 'response_format',
                value: 'JSON'
            },
				{
                inputType: 'checkbox',
                id: 'remember_me[]',
                name: 'remember_me[]',
				fieldLabel: 'remember me',
                value: '1'
            },
			{
                inputType: 'hidden',
                id: 'submitbutton',
                name: 'myhiddenbutton',
                value: 'hiddenvalue'
            }
 
        ],
        buttons: [{
            text: 'Submit',
            handler: function() {
		simple.getForm().getEl().dom.action = 'http://localhost/62/helloWorld/application/main.php';
	        simple.getForm().getEl().dom.method = 'POST';
                simple.getForm().submit();
            }
        }]
 
 
    });
 
 
 
    simple.render('mytraditionalform');
 
});
