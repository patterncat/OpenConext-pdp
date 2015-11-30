// Interpolation works as follows:
//
// Make a key with the translation and enclose the variable with {{}}
// ie "Hello {{name}}" Do not add any spaces around the variable name.
// Provide the values as: I18n.t("key", {name: "John Doe"})

I18n.entityName = function (entity) {
  var name = entity["name" + (I18n.locale === "en" ? "En" : "Nl")];
  if (_.isEmpty(name)) {
    name = entity["name" + (I18n.locale === "en" ? "Nl" : "En")];
  }
  return name;
};
I18n.entityDescription = function (entity) {
  var description = entity["description" + (I18n.locale === "en" ? "En" : "Nl")];
  if (_.isEmpty(description)) {
    description = entity["description" + (I18n.locale === "en" ? "Nl" : "En")];
  }
  return description;

};

I18n.translations.en = {
  code: "EN",
  name: "English",
  select_locale: "Select English",

  boolean: {
    yes: "Yes",
    no: "No"
  },

  date: {
    month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },

  header: {
    title: "Policy Administration Point",
    welcome: "Welcome ",
    links: {
      help_html: "<a href=\"https://github.com/OpenConext/OpenConext-pdp#policy-limitations\" target=\"_blank\">Help</a>",
      logout: "Logout",
      exit: "Exit"
    },
    idps: "Your institution(s)",
    sps: "Your service(s)",
    role: "Role"
  },

  profile: {
    PAP_CLIENT: "Institution admin",
    PAP_ADMIN: "SURFnet admin"
  },

  navigation: {
    policies: "Policies",
    violations: "Unauthorized logins",
    playground: "Playground",
    about: "About",
    my_idp: "My institute",
    new_policy: "+ New Policy"
  },

  policies: {
    name: "Name",
    description: "Description",
    serviceProviderId: "Service",
    identityProviderId: "Institution",
    identityProviderIds: "Institution(s)",
    violations: "Unauthorized logins",
    revisions: "Revisions",
    search: "Search policies...",
    flash: "Policy '{{policyName}}' was successfully {{action}}",
    flash_updated: "updated",
    flash_created: "created",
    flash_deleted: "deleted",
    confirmation: "Are your sure you want to remove policy {{policyName}}?",
    edit: "Edit",
    delete: "Delete"
  },

  datatable: {
    lengthMenu: "Showing _MENU_ entries",
    zeroRecords: "No data present",
    infoEmpty: "",
    info: "Showing _START_ to _END_ of _TOTAL_ entries",
    paginate_first: "First",
    paginate_previous: "Previous",
    paginate_next: "Next",
    paginate_last: "Last"
  },

  policy_detail: {
    update_policy: "Update policy" ,
    create_policy: "Create new policy",
    confirmation: "Are your sure you want to leave this page?",
    name: "Name",
    description: "Description",
    access: "Access",
    permit: "Permit",
    permit_info: "Permit policies enforce that a only a successful match of the attributes defined will result in a Permit. No match will result in a Deny.",
    deny: "Deny",
    deny_info: "Deny policies are less common to use. If the attributes in the policy match those of the person trying to login then this will result in a Deny. No match will result in a Permit.",
    deny_message: "Deny message",
    deny_message_info: "This is the message displayed to the user if access is denied based on this policy.",
    deny_message_nl: "Deny message in Dutch",
    sp_placeholder: "Select the Service Provider - required",
    idps_placeholder: "Select the Identity Providers - zero or more",
    rule: "Rule",
    rule_and: "AND",
    rule_and_info: "Policies with a logical AND rule enforce that all attributes defined must match those of the person trying to login.",
    rule_or: "OR",
    rule_or_info: "Policies defined with a logical OR only require one of the attributes to match the attributes of the person requesting access.",
    rule_info_add: " Note that attribute values with the same attribute name always be evaluated with the logical OR.",
    rule_info_add_2: "Note that a Deny access policy always and implicitly uses the logical AND for different attribute names.",
    submit: "Submit",
    cancel: "Cancel"
  },

  violations: {
    search: "Search unauthorized logins...",
    policyName: "Policy name: ",
    table: {
      sp_idp: "Institution and Service",
      decision: "Decision",
      created: "Date",
      is_playground: "Playground"
    }
  },

  playground: {
    policy: "Policy",
    policy_info: "Optional - the selected policy is only used to set defaults for the Service Provider, Identity Provider and the attributes",
    policy_search: "Select the Policy",
    idp_placeholder: "Select the institution - required",
    adventurous_title: "Feeling adventurous?",
    adventurous_text: "You can directly edit the raw source on the right.",
    check_policies: "Check policies again",
    clear_policies: "Clear",
    reload_policy: "Reload to apply changes made below"

  },

  policy_attributes: {
    attribute_value_placeholder:"Attribute value...",
    attribute: "Attribute",
    values: "Values(s)",
    new_value: "Add a new value...",
    new_attribute: "Add new attribute...."
  },
  contact: {
    email: "Service support email"
  },

  not_found: {
    title: "The requested page could not be found.",
    description_html: "Please check the spelling of the URL or go to the <a href=\"/\">homepage</a>."
  },

  server_error: {
    title: "Something went wrong when opening this page.",
    description_html: "Please try again later or contact <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>."
  },

  logout: {
    title: "Logout completed successfully.",
    description_html: "You <strong>MUST</strong> close your browser to complete the logout process."
  },

  footer: {
    surfnet_html: "<a href=\"http://www.surfnet.nl/en\" target=\"_blank\">SURFnet</a>",
    terms_html: "<a href=\"https://wiki.surfnet.nl/display/conextsupport/Terms+of+Service+%28EN%29\" target=\"_blank\">Terms of Service</a>",
    contact_html: "<a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>"
  }

};
