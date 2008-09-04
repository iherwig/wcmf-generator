
/*
 This file was generated by wCMFGenerator 2.6.1.0010 from model/requirements.xmi on 24.08.08 17:07. 
  Manual modifications should be placed inside the protected regions.
   developer: Giuseppe Platania
  */
  
Ext.onReady(function(){

	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
	var bd = Ext.getBody();
	bd.createChild({tag: 'h2', html: 'ChiWorker Edit View'});
	
	var form = new Ext.FormPanel({

	labelWidth: 150,
	url:'',
	frame:true,
    title: 'Edit Form',
    bodyStyle:'padding:5px 5px 0',
    width: 500,
    defaults: {width: 230},
    defaultType: 'textfield',
	items: [				
			{	
			fieldLabel: 'id',
	        name: 'id',
	        allowBlank:false,
	        inputType:'textfield',},
			{	
			fieldLabel: 'fk_chibusinessprocess_id',
	        name: 'fk_chibusinessprocess_id',
	        allowBlank:false,
	        inputType:'textfield',},
			{	
			fieldLabel: 'fk_package_id',
	        name: 'fk_package_id',
	        allowBlank:false,
	        inputType:'textfield',},

		
 			],
		buttons: [{
	        text: 'Save',
	        	handler:function() {
      				form.getForm().submit({
      				url:'main.php',
      				method: 'POST',
      				success:function(form, action) {
          				alert('Success: ' + action.response.responseText);
        			},
        			failure:function(form, action) {
          				alert('Failure: ' + action.failureType);
        		}
      });
    }
	    },{
	        text: 'Cancel',
	        	handler:function() {
      				form.getForm().reset();
    			}
	    }]
	});
	
	form.render(document.body);
});
