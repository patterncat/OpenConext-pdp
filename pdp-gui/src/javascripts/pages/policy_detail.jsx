/** @jsx React.DOM */
App.Pages.PolicyDetail = React.createClass({

  componentWillUpdate: function () {
    var node = this.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function () {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight
    }
  },

  getInitialState: function () {
    return this.props.policy;
  },

  componentWillReceiveProps: function (nextProps) {
    this.state = nextProps.policy;
  },

  toggleDenyRule: function (e) {
    var partialState = {denyRule: !this.state.denyRule};
    if (!this.state.denyRule) {
      partialState.allAttributesMustMatch = true;
    }
    this.setState(partialState);

  },

  parseEntities: function (entities) {
    var options = entities.map(function (entity) {
      return {value: entity.entityId, display: I18n.entityName(entity)};
    });
    return options;
  },

  handleChangeServiceProvider: function (newValue) {
    this.setState({serviceProviderId: newValue});
  },


  handleChangeIdentityProvider: function (newValue) {
    this.setState({identityProviderIds: newValue});
  },

  cancelForm: function () {
    if (confirm(I18n.t("policy_detail.confirmation"))) {
      page("/policies");
    }
  },

  submitForm: function () {
    var self = this;
    App.Controllers.Policies.saveOrUpdatePolicy(this.state, function (jqxhr) {
      jqxhr.isConsumed = true;
      this.setState({flash: jqxhr.responseJSON.details.name});
    }.bind(this));
  },

  isValidPolicy: function () {
    var policy = this.state;
    var emptyAttributes = policy.attributes.filter(function (attr) {
      return _.isEmpty(attr.value);
    });
    var validClassName = (_.isEmpty(policy.attributes) || emptyAttributes.length > 0) ? "failure" : "success";
    var inValid = _.isEmpty(policy.name) || _.isEmpty(policy.description) || _.isEmpty(policy.serviceProviderId)
        || _.isEmpty(policy.attributes) || emptyAttributes.length > 0 || _.isEmpty(policy.denyAdvice) || _.isEmpty(policy.denyAdviceNl);
    return !inValid;
  },

  handleOnChangeName: function (e) {
    this.setState({name: e.target.value});
  },

  handleOnChangeDescription: function (e) {
    this.setState({description: e.target.value});
  },

  handleOnDenyAdvice: function (e) {
    this.setState({denyAdvice: e.target.value});
  },

  handleOnDenyAdviceNl: function (e) {
    this.setState({denyAdviceNl: e.target.value});
  },

  renderNameDescription: function (policy) {
    var workflow = _.isEmpty(policy.name) || _.isEmpty(policy.description) ? "failure" : "success";
    return (
        <div>
          <div className={"form-element "+workflow}>
            <p className="label">{I18n.t("policy_detail.name")}</p>
            <input type="text" name="name" className="form-input" value={policy.name}
                   onChange={this.handleOnChangeName}/>

            <p className="label">{I18n.t("policy_detail.description")}</p>
          <textarea cols="5" name="description" className="form-input" value={policy.description}
                    onChange={this.handleOnChangeDescription}/>
          </div>
          <div className="bottom"></div>
        </div>
    );
  }
  ,
  renderDenyAdvice: function (policy) {
    var workflow = _.isEmpty(policy.denyAdvice) ? "failure" : "success";
    return (
        <div className={"form-element "+workflow}>
          <p className="label before-em">{I18n.t("policy_detail.deny_message")}</p>
          <em>{I18n.t("policy_detail.deny_message_info")}</em>
          <input type="text" name="denyMessage" className="form-input" value={policy.denyAdvice}
                 onChange={this.handleOnDenyAdvice}/>

          <p className="label">{I18n.t("policy_detail.deny_message_nl")}</p>
          <input type="text" name="denyMessageNl" className="form-input" value={policy.denyAdviceNl}
                 onChange={this.handleOnDenyAdviceNl}/>

          <div className="bottom"></div>
        </div>
    );
  }
  ,

  renderServiceProvider: function (policy) {
    var workflow = _.isEmpty(policy.serviceProviderId) ? "failure" : "success";
    return (
        <div>
          <div className={"form-element " + workflow}>
            <p className="label">{I18n.t("policies.serviceProviderId")}</p>
            <App.Components.Select2Selector
                defaultValue={policy.serviceProviderId}
                placeholder={I18n.t("policy_detail.sp_placeholder")}
                select2selectorId={"serviceProvider"}
                options={this.parseEntities(this.props.serviceProviders)}
                handleChange={this.handleChangeServiceProvider}/>
          </div>
          <div className="bottom"></div>
        </div>
    );
  }
  ,

  renderIdentityProvider: function (policy) {
    return (
        <div>
          <div className="form-element success">
            <p className="label">{I18n.t("policies.identityProviderIds")}</p>

            <App.Components.Select2Selector
                defaultValue={policy.identityProviderIds}
                placeholder={I18n.t("policy_detail.idps_placeholder")}
                select2selectorId={"identityProvider"}
                options={this.parseEntities(this.props.identityProviders)}
                multiple={true}
                handleChange={this.handleChangeIdentityProvider}/>
          </div>
          <div className="bottom"></div>
        </div>
    );
  },

  renderDenyPermitRule: function (policy) {
    var classNameSelected = policy.denyRule ? "checked" : "";
    var classNamePermit = policy.denyRule ? "not-selected" : "";
    var classNameDeny = !policy.denyRule ? "not-selected" : "";
    var policyPermit = policy.denyRule ? I18n.t("policy_detail.deny") : I18n.t("policy_detail.permit");
    return (
        <div>
          <div className="form-element success">
            <div className="column-3 first">
              <p className="label">{I18n.t("policy_detail.access")}</p>

              <div id="ios_checkbox" className={classNameSelected + " ios-ui-select"} onClick={this.toggleDenyRule}>
                <div className="inner"></div>
                <p>{policyPermit}</p>
              </div>
            </div>
            <div className="column-3 middle">
              <p className={"info " + classNamePermit}>{I18n.t("policy_detail.permit")}</p>
              <em className={classNamePermit}>{I18n.t("policy_detail.permit_info")}</em>
            </div>
            <div className="column-3">
              <p className={"info "+classNameDeny}>{I18n.t("policy_detail.deny")}</p>
              <em className={classNameDeny}>{I18n.t("policy_detail.deny_info")}</em>
            </div>
          </div>
          <div className="bottom"></div>
        </div>
    );
  }
  ,

  handleChooseRule: function (value) {
    return function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({allAttributesMustMatch: value === "AND"});
    }.bind(this);
  },

  renderRule: function (value, selected) {
    var className = value + " " + (selected ? "selected" : "");
    if (this.state.denyRule) {
      return (
          <li key={value}>
            <span className={className}>{value}</span>
          </li>
      );
    } else {
      return (
          <li key={value}>
            <a href="#" className={className} onClick={this.handleChooseRule(value)}>{value}</a>
          </li>
      );
    }
  },

  setAttributeState: function (newAttributeState) {
    this.setState(newAttributeState);
  },

  renderAttributes: function (policy) {
    //we need state changes from the child component
    return (<App.Components.PolicyAttributes
        policy={this.state}
        allowedAttributes={this.props.allowedAttributes}
        setAttributeState={this.setAttributeState}/>);
  },

  renderLogicalRule: function (policy) {
    var allAttributesMustMatch = policy.allAttributesMustMatch;
    var classNameAnd = !policy.allAttributesMustMatch ? "not-selected" : "";
    var classNameOr = policy.allAttributesMustMatch ? "not-selected" : "";

    return (
        <div>
          <div className="form-element success">
            <div className="column-3 first">
              <p className="label">{I18n.t("policy_detail.rule")}</p>
              <ul className="logical-rule">
                {[
                  this.renderRule(I18n.t("policy_detail.rule_and"), allAttributesMustMatch),
                  this.renderRule(I18n.t("policy_detail.rule_or"), !allAttributesMustMatch)
                ]}
              </ul>
            </div>
            <div className="column-3 middle">
              <p className={"info "+classNameAnd}>{I18n.t("policy_detail.rule_and")}</p>
              <em className={classNameAnd}>{I18n.t("policy_detail.rule_and_info")}</em>
            </div>
            <div className="column-3">
              <p className={"info "+classNameOr}>{I18n.t("policy_detail.rule_or")}</p>
              <em className={classNameOr}>{I18n.t("policy_detail.rule_or_info")}</em>
            </div>
            <em className="note"><sup>*</sup>{I18n.t("policy_detail.rule_info_add")} </em>
            {this.renderDenyRuleNote()}
          </div>
          <div className="bottom"></div>
        </div>
    );
  },

  renderDenyRuleNote: function () {
    if (this.state.denyRule) {
      return (<em><sup>*</sup> {I18n.t("policy_detail.rule_info_add_2")}</em>);
    }
  },

  closeFlash: function () {
    this.setState({flash: undefined});
  }
  ,

  renderFlash: function () {
    if (this.state.flash) {
      return (
          <div className="flash"><p className="error">{this.state.flash}</p><a href="#" onClick={this.closeFlash}><i
              className="fa fa-remove"></i></a>
          </div>
      );
    }
  }
  ,

  renderActions: function (policy) {
    var classNameSubmit = this.isValidPolicy() ? "" : "disabled";
    return (
        <div className="form-element">
          <a className={classNameSubmit + " submit c-button"} href="#"
             onClick={this.submitForm}>{I18n.t("policy_detail.submit")}</a>
          <a className="c-button cancel" href="#" onClick={this.cancelForm}>{I18n.t("policy_detail.cancel")}</a>
        </div>
    );
  }
  ,

  render: function () {
    var policy = this.state;
    var title = policy.id ? I18n.t("policy_detail.update_policy") : I18n.t("policy_detail.create_policy");
    return (
        <div className="l-center mod-policy-detail">
          {this.renderFlash()}
          <div className="l-split-left form-element-container box">
            <p className="form-element form-title">{title}</p>
            {this.renderNameDescription(policy)}
            {this.renderDenyPermitRule(policy)}
            {this.renderServiceProvider(policy)}
            {this.renderIdentityProvider(policy)}
            {this.renderLogicalRule(policy)}
            {this.renderAttributes(policy)}
            {this.renderDenyAdvice(policy)}
            {this.renderActions(policy)}
          </div>
          <div className="l-split-right form-element-container box">
            {this.renderAboutPage()}
          </div>
        </div>
    )
  },

  renderAboutPage: function () {
    return I18n.locale === "en" ? <App.Help.PolicyDetailHelpEn/> : <App.Help.PolicyDetailHelpNl/>;
  }


});

