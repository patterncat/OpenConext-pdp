/** @jsx React.DOM */

var App = {
  Components: {},
  Pages: {},
  Controllers: {},
  Utils: {},


  store: {}, // in memory key/value store, to save temporary settings

  initialize: function () {
    var parameterByName = App.Utils.QueryParameter.getParameterByName("lang");
    I18n.locale = parameterByName ? parameterByName : "en";
    $(document).ajaxError(this.ajaxError.bind(this));
    $(document).ajaxStart(this.showSpinner.bind(this));
    $(document).ajaxStop(this.hideSpinner.bind(this));

    $(document).ajaxSend(function (event, jqxhr, settings) {
      jqxhr.setRequestHeader("Content-Type", "application/json");
    }.bind(this));

    this.fetchUserData(function (user) {
      this.currentUser = user;

      for (controller in App.Controllers) {
        App.Controllers[controller].initialize();
      }

      page("/", this.rootPath.bind(this));
      page("*", this.actionNotFound.bind(this));

      page.start();
    }.bind(this));
  },

  actionNotFound: function () {
    this.render(App.Pages.NotFound());
  },

  rootPath: function () {
    page.redirect("/policies");
  },

  render: function (page) {
    if (this.mainComponent) {
      //stupid hack to ensure non-controlled components are updated. the performance penalty is to neglect
      this.mainComponent.setProps({
        page: App.Pages.Empty()
      });
      this.mainComponent.setProps({
        page: page
      });
    } else {
      this.mainComponent = React.renderComponent(App.Components.Main({page: page}), document.getElementById("app"));
    }

  },

  apiUrl: function (value, params) {
    return page.uri(BASE_URL + value, params);
  },

  fetchUserData: function (callback) {
    var self = this;
    $.get(App.apiUrl("/internal/users/me"), function (data) {
      if (!data) {
        self.render(App.Pages.NotFound());
      } else {
        callback(data);
      }
    }).fail(function (data) {
      self.render(App.Pages.NotFound());
    });
  },

  showSpinner: function () {
    if (this.mainComponent) {
      this.mainComponent.setProps({loading: true});
    }
  },

  hideSpinner: function () {
    if (this.mainComponent) {
      this.mainComponent.setProps({loading: false});
    }
  },

  ajaxError: function (event, xhr) {
    if (xhr.isConsumed) {
      return;
    }
    switch (xhr.status) {
      case 404:
        App.actionNotFound();
        break;
      default:
        this.render(App.Pages.ServerError());
        console.error("Ajax request failed");
    }
  },

  setFlash: function(message){
    this.store.flash = message;
  },

  getFlash: function(){
    var message = this.store.flash;
    this.store.flash = undefined;
    return message;
  }
};
