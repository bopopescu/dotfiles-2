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

"""Base class for PySpark Job."""

from __future__ import absolute_import
from __future__ import unicode_literals
import argparse

from apitools.base.py import encoding

from googlecloudsdk.calliope import arg_parsers
from googlecloudsdk.command_lib.dataproc.jobs import base as job_base


class PySparkBase(job_base.JobBase):
  """Submit a PySpark job to a cluster."""

  @staticmethod
  def Args(parser):
    """Performs command-line argument parsing specific to PySpark."""

    parser.add_argument(
        'py_file',
        help='The main .py file to run as the driver.')
    parser.add_argument(
        '--py-files',
        type=arg_parsers.ArgList(),
        metavar='PY_FILE',
        default=[],
        help=('Comma separated list of Python files to be provided to the job.'
              'Must be one of the following file formats" .py, ,.zip, or .egg'))
    parser.add_argument(
        '--jars',
        type=arg_parsers.ArgList(),
        metavar='JAR',
        default=[],
        help=('Comma separated list of jar files to be provided to the '
              'executor and driver classpaths.'))
    parser.add_argument(
        '--files',
        type=arg_parsers.ArgList(),
        metavar='FILE',
        default=[],
        help='Comma separated list of files to be provided to the job.')
    parser.add_argument(
        '--archives',
        type=arg_parsers.ArgList(),
        metavar='ARCHIVE',
        default=[],
        help=('Comma separated list of archives to be provided to the job. '
              'must be one of the following file formats: .zip, .tar, .tar.gz, '
              'or .tgz.'))
    parser.add_argument(
        'job_args',
        nargs=argparse.REMAINDER,
        help='The arguments to pass to the driver.')
    parser.add_argument(
        '--properties',
        type=arg_parsers.ArgDict(),
        metavar='PROPERTY=VALUE',
        help='A list of key value pairs to configure PySpark.')
    parser.add_argument(
        '--driver-log-levels',
        type=arg_parsers.ArgDict(),
        metavar='PACKAGE=LEVEL',
        help=('A list of package to log4j log level pairs to configure driver '
              'logging. For example: root=FATAL,com.example=INFO'))

  @staticmethod
  def GetFilesByType(args):
    return {
        'py_file': args.py_file,
        'py_files': args.py_files,
        'archives': args.archives,
        'files': args.files,
        'jars': args.jars}

  @staticmethod
  def ConfigureJob(messages, job, files_by_type, logging_config, args):
    """Populates the pysparkJob member of the given job."""

    pyspark_job = messages.PySparkJob(
        args=args.job_args or [],
        archiveUris=files_by_type['archives'],
        fileUris=files_by_type['files'],
        jarFileUris=files_by_type['jars'],
        pythonFileUris=files_by_type['py_files'],
        mainPythonFileUri=files_by_type['py_file'],
        loggingConfig=logging_config)

    if args.properties:
      pyspark_job.properties = encoding.DictToMessage(
          args.properties, messages.PySparkJob.PropertiesValue)

    job.pysparkJob = pyspark_job
