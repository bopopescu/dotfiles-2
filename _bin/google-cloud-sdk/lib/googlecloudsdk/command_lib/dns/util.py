# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Helper functions for DNS commands."""
from googlecloudsdk.command_lib.dns import flags


def ParseKey(algorithm, key_length, key_type, messages):
  """Generate a keyspec from the given (unparsed) command line arguments.

  Args:
    algorithm: (str) String mnemonic for the DNSSEC algorithm to be specified in
        the keyspec; must be a value from AlgorithmValueValuesEnum.
    key_length: (int) The key length value to include in the keyspec.
    key_type: ('KEY_SIGNING'|'ZONE_SIGNING') Whether to create a keyspec for a
        KSK or a ZSK.
    messages: (module) Module (generally auto-generated by the API build rules)
        containing the API client's message classes.

  Returns:
    A messages.DnsKeySpec instance created from the given arguments.
  """

  key_spec = None

  if algorithm is not None or key_length is not None:
    spec_args = {}
    spec_args['keyType'] = messages.DnsKeySpec.KeyTypeValueValuesEnum(
        key_type)
    if algorithm is not None:
      spec_args['algorithm'] = messages.DnsKeySpec.AlgorithmValueValuesEnum(
          algorithm)
    if key_length is not None:
      spec_args['keyLength'] = key_length

    if spec_args:
      key_spec = messages.DnsKeySpec(**spec_args)

  return key_spec


def ParseDnssecConfigArgs(args, messages):
  """Parse all relevant command line arguments and generate a DNSSEC config.

  Args:
    args: (dict{str,(str|int)}) Dict of command line arguments; value type
        dependent on particular command line argument.
    messages: (module) Module (generally auto-generated by the API build rules)
        containing the API client's message classes.

  Returns:
    A messages.ManagedZoneDnsSecConfig instance populated from the given
    command line arguments.
  """

  dnssec_config = None
  key_specs = []

  ksk_key = ParseKey(
      args.ksk_algorithm, args.ksk_key_length, 'KEY_SIGNING', messages)
  if ksk_key is not None:
    key_specs.append(ksk_key)

  zsk_key = ParseKey(
      args.zsk_algorithm, args.zsk_key_length, 'ZONE_SIGNING', messages)
  if zsk_key is not None:
    key_specs.append(zsk_key)

  dnssec_config_args = {}
  if key_specs:
    dnssec_config_args['defaultKeySpecs'] = key_specs
  if getattr(args, 'denial_of_existence', None) is not None:
    dnssec_config_args['nonExistence'] = (flags.GetDoeFlagMapper()
                                          .GetEnumForChoice(
                                              args.denial_of_existence))
  if args.dnssec_state is not None:
    dnssec_config_args['state'] = (flags.GetDnsSecStateFlagMapper()
                                   .GetEnumForChoice(
                                       args.dnssec_state))

  if dnssec_config_args:
    dnssec_config = messages.ManagedZoneDnsSecConfig(**dnssec_config_args)

  return dnssec_config
