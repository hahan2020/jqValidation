/*!
 * jqValidation Plugin v0.1
 * Author: 345480567@qq.com
 * ==========================================================
 * Copyright 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ==========================================================
 */

;(function( $ ){
  //可能的时候行为有：tooltip，加红星，focus
  /* jqValid CLASS DEFINITION */
  var plugin_name = "jqValid";
  var FormValid = function ( form_el ) {
    var jq_form = $( form_el );
    var form_valid = this;
    $("input, select, textarea", jq_form).each(function(){
      //单个元素的验证
      form_valid[form_valid.length] = new FieldValid(this);
      //定义在field上的多个field之间的验证
      mfield_valid[mfield_valid.length] = new MFieldValid(this);
    });
  };

  FormValid.prototype = {
    field_valid : [], mfield_valid : []
  };

  var FieldValid = function(field){
    var jq_field = $(field);
    var check_type = (jq_field.attr('check-type')==undefined)?
      null:jq_field.attr('check-type').split(' ');

    if (check_type != null && check_type.length > 0) {
        for (var i=0; i < check_type.length; i++) {
          var check_name = check_type[i];
          this.addCheck(check_name);
        }
    }
  };

  FieldValid.prototype = {
    checks = [], unchecks = [], rules : [], 
    addRule : function(rule_name, fun) {
      FieldValid.prototype.rules[rule_name] = fun;
    },
    removeRule : function(rule_name) {
      FieldValid.prototype.rules[rule_name] = $.noop;
    },
    addCheck : function(check_name) {
      if (check_name.substr(0, 1) == '!') {
        check_name = check_name.substr(1, check_name.length - 1);
        this.unchecks[this.unchecks.length] = check_name;
      } else {
        this.checks[this.checks.length] = check_name;
      }
    },
    check : function() {
            // if (FieldValid.prototype.rules[flag] == $.noop)
            //   console.log("jq-valid: rules " + check_type[i] + " is not exist.");
            // var result = FieldValid.prototype.rules[flag].call(this);
    }
  };

  var MFieldValid = function(field1, field2, fieldn){};

  MFieldValid.prototype = {};

 /* tablegrid PRIVATE METHODS
  * ========================= */
  function getInstance(el, options) {
    //非table元素不能初始化实例
    if ("FORM" != $(el).get(0).tagName) {
      alert("jq-valid can be init only use form!");
      return;
    }
    var jq_valid = $.data(el, plugin_name);
    if (!jq_valid) {
      jq_valid = new FormValid(el, options);
      $.data(el, plugin_name, jq_valid);
    }
    if (options) {
      extendOptions.call(tablegrid, options);
    }
    return jq_valid;
  };

  /* jq_valid PLUGIN DEFINITION */

  //对所有选中的form进行初始化
  $.fn.jqValid = function ( options ) {
    if (this.size() == 1) {
      return getInstance(this[0], options);
    } else if (this.size() > 1) {
      this.each(function() {
        getInstance(this, options);
      });
    }
    return this;
  };

  FieldValid.prototype
    .addRule('required', function(){
      return ($.trim($(this).val()) == '');
    });


})(window.jQuery);

/*
{
        name: 'required',
        validate: function(value) {
          return ($.trim(value) == '');
        },
        defaultMsg: '请输入内容。'
      },{
        name: 'number',
        validate: function(value) {
          return (!/^[0-9]\d*$/.test(value));
        },
        defaultMsg: '请输入数字。'
      },{
        name: 'mail',
        validate: function(value) {
          return (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value));
        },
        defaultMsg: '请输入邮箱地址。'
      },{
        name: 'char',
        validate: function(value) {
          return (!/^[a-z\_\-A-Z]*$/.test(value));
        },
        defaultMsg: '请输入英文字符。'
      },{
        name: 'chinese',
        validate: function(value) {
          return (!/^[\u4e00-\u9fff]$/.test(value));
        },
        defaultMsg: '请输入汉字。'
      }
*/      
