QoDesk.QoAdminMyProfile = Ext.extend(Ext.app.Module, {

	  moduleType : 'system'
	, moduleId : 'qo-admin-my-profile'
	, phpFile : 'qo-admin-my-profile.php'
	, moduleAuthor: 'Paul Simmons'
	, moduleVersion: '1.1.0'
	//===========================================================================================
	// 1.0.0 Initial Creation
	// 1.0.1 For Line compatability for QO-Admin
	// 1.1.0 For Line compatability for QO-Admin
	//===========================================================================================

	
	, init : function(){
        this.launcher = {
            handler : this.createWindow,
            iconCls: 'icon-grid',
            scope: this,
            //shortcutIconCls: 'demo-grid-shortcut',
            text: 'My Profile',
            tooltip: '<b>QO Admin</b><br />My Profile'
        }
    }
	
	, createWindow : function(){
	
	    var desktop = this.app.getDesktop();
        var win = desktop.getWindow('qo-admin-my-profile-win');

		if (!win) {
			// --
			Ext.QuickTips.init();

			// turn on validation errors beside the field globally
			Ext.form.Field.prototype.msgTarget = 'side';
			
			function loadFormData () {
				formMyProfile.getForm().load ({
					url: this.app.connection
					, params: {
						task: "read"
						, moduleId: this.moduleId
						, fileName: this.phpFile
					}
					, scope: this
				});
			};

			var formMyProfile = new Ext.FormPanel ({
				id: 'qo-admin-my-profile-form'
				, labelWidth: 75
				, url: this.app.connection
				, frame: true
				, bodyStyle:'padding:5px 5px 0'
				, items: [
					new Ext.form.Hidden ({ name: 'task', value: 'save' })
					, new Ext.form.Hidden ({ name: 'moduleId', value: this.moduleId })
					, new Ext.form.Hidden ({ name: 'fileName', value: this.phpFile })
					, {
						fieldLabel: 'First Name'
						, name: 'first_name'
						, allowBlank:false
						, xtype:'textfield'
						, width: 200
					}
					, {
						fieldLabel: 'Last Name'
						, name: 'last_name'
						, allowBlank:false
						, xtype:'textfield'
						, width: 200
					}
					, {
						fieldLabel: 'Email'
						, name: 'email_address'
						, vtype: 'email'
						, allowBlank:false
						, xtype:'textfield'
						, width: 200
					}
					, {
						fieldLabel: 'Password'
						, name: 'password'
						, allowBlank:false
						, xtype:'textfield'
						, inputType: 'password'
						, renderer: function() {
							return '**********';
						}
						, width: 100
					}
				]
				, tbar: [
					{
						text: 'Save'
						, type: 'submit'
						, handler: function () {
							formMyProfile.getForm().submit({
								waitMsg: 'Saving...'
								, failure: function (response,options) {
									Ext.MessageBox.alert('Error','Unable to save record');
								}
								, scope: this
							});
						}
					}
					, {
						text: 'Reset'
						, type: 'reset'
						, handler: function () {
							formMyProfile.getForm().load ({
								url: this.app.connection
								, params: {
									task: "read"
									, moduleId: this.moduleId
									, fileName: this.phpFile
								}
							});
						}
						, scope: this
					}
				]
			});

			formMyProfile.getForm().load ({
				url: this.app.connection
				, params: {
					task: "read"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
			});			

			win = desktop.createWindow({
                id: 'qo-admin-my-profile-win',
                title:'My Profile',
                width:360,
                height:200,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
				layout: 'fit',
                items: formMyProfile,
                taskbuttonTooltip: '<b>QO Admin</b><br />My Profile'
            });
		}
		win.show();
	}
});

