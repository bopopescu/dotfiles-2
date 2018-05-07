"""Generated client library for serviceuser version v1."""
# NOTE: This file is autogenerated and should not be edited by hand.
from apitools.base.py import base_api
from googlecloudsdk.third_party.apis.serviceuser.v1 import serviceuser_v1_messages as messages


class ServiceuserV1(base_api.BaseApiClient):
  """Generated client library for service serviceuser version v1."""

  MESSAGES_MODULE = messages
  BASE_URL = u'https://serviceuser.googleapis.com/'

  _PACKAGE = u'serviceuser'
  _SCOPES = [u'https://www.googleapis.com/auth/cloud-platform', u'https://www.googleapis.com/auth/cloud-platform.read-only', u'https://www.googleapis.com/auth/service.management']
  _VERSION = u'v1'
  _CLIENT_ID = '1042881264118.apps.googleusercontent.com'
  _CLIENT_SECRET = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _USER_AGENT = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _CLIENT_CLASS_NAME = u'ServiceuserV1'
  _URL_VERSION = u'v1'
  _API_KEY = None

  def __init__(self, url='', credentials=None,
               get_credentials=True, http=None, model=None,
               log_request=False, log_response=False,
               credentials_args=None, default_global_params=None,
               additional_http_headers=None):
    """Create a new serviceuser handle."""
    url = url or self.BASE_URL
    super(ServiceuserV1, self).__init__(
        url, credentials=credentials,
        get_credentials=get_credentials, http=http, model=model,
        log_request=log_request, log_response=log_response,
        credentials_args=credentials_args,
        default_global_params=default_global_params,
        additional_http_headers=additional_http_headers)
    self.projects_services = self.ProjectsServicesService(self)
    self.projects = self.ProjectsService(self)
    self.services = self.ServicesService(self)

  class ProjectsServicesService(base_api.BaseApiService):
    """Service class for the projects_services resource."""

    _NAME = u'projects_services'

    def __init__(self, client):
      super(ServiceuserV1.ProjectsServicesService, self).__init__(client)
      self._upload_configs = {
          }

    def Disable(self, request, global_params=None):
      """Disable a service so it can no longer be used with a.
project. This prevents unintended usage that may cause unexpected billing
charges or security leaks.

Operation<response: google.protobuf.Empty>

      Args:
        request: (ServiceuserProjectsServicesDisableRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Disable')
      return self._RunMethod(
          config, request, global_params=global_params)

    Disable.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'serviceuser.projects.services.disable',
        ordered_params=[u'projectsId', u'servicesId'],
        path_params=[u'projectsId', u'servicesId'],
        query_params=[],
        relative_path=u'v1/projects/{projectsId}/services/{servicesId}:disable',
        request_field=u'disableServiceRequest',
        request_type_name=u'ServiceuserProjectsServicesDisableRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Enable(self, request, global_params=None):
      """Enable a service so it can be used with a project.
See [Cloud Auth Guide](https://cloud.google.com/docs/authentication) for
more information.

Operation<response: google.protobuf.Empty>

      Args:
        request: (ServiceuserProjectsServicesEnableRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Enable')
      return self._RunMethod(
          config, request, global_params=global_params)

    Enable.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'serviceuser.projects.services.enable',
        ordered_params=[u'projectsId', u'servicesId'],
        path_params=[u'projectsId', u'servicesId'],
        query_params=[],
        relative_path=u'v1/projects/{projectsId}/services/{servicesId}:enable',
        request_field=u'enableServiceRequest',
        request_type_name=u'ServiceuserProjectsServicesEnableRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """List enabled services for the specified consumer.

      Args:
        request: (ServiceuserProjectsServicesListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListEnabledServicesResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'serviceuser.projects.services.list',
        ordered_params=[u'projectsId'],
        path_params=[u'projectsId'],
        query_params=[u'pageSize', u'pageToken'],
        relative_path=u'v1/projects/{projectsId}/services',
        request_field='',
        request_type_name=u'ServiceuserProjectsServicesListRequest',
        response_type_name=u'ListEnabledServicesResponse',
        supports_download=False,
    )

  class ProjectsService(base_api.BaseApiService):
    """Service class for the projects resource."""

    _NAME = u'projects'

    def __init__(self, client):
      super(ServiceuserV1.ProjectsService, self).__init__(client)
      self._upload_configs = {
          }

  class ServicesService(base_api.BaseApiService):
    """Service class for the services resource."""

    _NAME = u'services'

    def __init__(self, client):
      super(ServiceuserV1.ServicesService, self).__init__(client)
      self._upload_configs = {
          }

    def Search(self, request, global_params=None):
      """Search available services.

When no filter is specified, returns all accessible services. For
authenticated users, also returns all services the calling user has
"servicemanagement.services.bind" permission for.

      Args:
        request: (ServiceuserServicesSearchRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (SearchServicesResponse) The response message.
      """
      config = self.GetMethodConfig('Search')
      return self._RunMethod(
          config, request, global_params=global_params)

    Search.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'serviceuser.services.search',
        ordered_params=[],
        path_params=[],
        query_params=[u'pageSize', u'pageToken'],
        relative_path=u'v1/services:search',
        request_field='',
        request_type_name=u'ServiceuserServicesSearchRequest',
        response_type_name=u'SearchServicesResponse',
        supports_download=False,
    )
