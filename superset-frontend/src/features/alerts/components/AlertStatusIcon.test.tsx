/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { render, screen } from 'spec/helpers/testing-library';
import AlertStatusIcon from './AlertStatusIcon';
import { AlertState } from '../types';

describe('AlertStatusIcon - WCAG 1.4.1 Use of Color', () => {
  it('renders sr-only text label alongside icon for Success state', () => {
    render(<AlertStatusIcon state={AlertState.Success} isReportEnabled={false} />);
    expect(screen.getByText('Alert triggered, notification sent')).toBeInTheDocument();
  });

  it('renders sr-only text label for Error state', () => {
    render(<AlertStatusIcon state={AlertState.Error} isReportEnabled={false} />);
    expect(screen.getByText('Alert failed')).toBeInTheDocument();
  });

  it('renders sr-only text label for Working state', () => {
    render(<AlertStatusIcon state={AlertState.Working} isReportEnabled={false} />);
    expect(screen.getByText('Alert running')).toBeInTheDocument();
  });

  it('renders sr-only text label for Noop state', () => {
    render(<AlertStatusIcon state={AlertState.Noop} isReportEnabled={false} />);
    expect(screen.getByText('Nothing triggered')).toBeInTheDocument();
  });

  it('renders sr-only text label for Grace state', () => {
    render(<AlertStatusIcon state={AlertState.Grace} isReportEnabled={false} />);
    expect(screen.getByText('Alert Triggered, In Grace Period')).toBeInTheDocument();
  });

  it('renders report-specific labels when isReportEnabled', () => {
    render(<AlertStatusIcon state={AlertState.Success} isReportEnabled />);
    expect(screen.getByText('Report sent')).toBeInTheDocument();
  });

  it('marks icon as aria-hidden to avoid duplicate announcements', () => {
    const { container } = render(
      <AlertStatusIcon state={AlertState.Success} isReportEnabled={false} />,
    );
    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });
});
