
/*

*/
Ext.onReady(function(){

	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
	var bd = Ext.getBody();
	bd.createChild({tag: 'h2', html: 'Enterprise Edit View'});
	
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
			fieldLabel: 'Name',
	        name: 'Name',
	        allowBlank:false,
	        inputType:'textfield',},
{	
			fieldLabel: 'Description',
	        name: 'Description',
	        allowBlank:false,
	        inputType:'htmleditor',},

		
 			],
		buttons: [{
	        text: 'Save',
	        	handler:function() {
      				form.getForm().submit({
      				url:'/actor/save.ashx',
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
