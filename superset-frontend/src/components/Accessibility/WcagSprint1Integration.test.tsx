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

/**
 * WCAG Sprint 1 Integration Tests
 *
 * Tests for WCAG 2.1 Level A criteria:
 * - 1.1.1 Non-text Content
 * - 1.3.3 Sensory Characteristics
 * - 1.4.1 Use of Color
 * - 2.4.1 Bypass Blocks (SkipLink)
 * - 3.3.1 Error Identification
 * - 4.1.3 Status Messages (StatusAnnouncer)
 */

describe('WCAG 2.4.1 - SkipLink Component', () => {
  it('renders with correct href targeting main-content', async () => {
    const { SkipLink } = await import('./SkipLink');
    render(<SkipLink />);
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#main-content');
    expect(link).toHaveClass('a11y-skip-link');
  });

  it('accepts custom targetId', async () => {
    const { SkipLink } = await import('./SkipLink');
    render(<SkipLink targetId="custom-target" />);
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#custom-target');
  });
});

describe('WCAG 4.1.3 - StatusAnnouncer Component', () => {
  it('renders polite and assertive live regions', async () => {
    const { StatusAnnouncerProvider } = await import('./StatusAnnouncer');
    render(
      <StatusAnnouncerProvider>
        <div>Test content</div>
      </StatusAnnouncerProvider>,
    );
    const politeRegion = document.getElementById('a11y-status-announcer');
    const assertiveRegion = document.getElementById('a11y-alert-announcer');

    expect(politeRegion).toBeInTheDocument();
    expect(politeRegion).toHaveAttribute('role', 'status');
    expect(politeRegion).toHaveAttribute('aria-live', 'polite');

    expect(assertiveRegion).toBeInTheDocument();
    expect(assertiveRegion).toHaveAttribute('role', 'alert');
    expect(assertiveRegion).toHaveAttribute('aria-live', 'assertive');
  });
});

describe('WCAG Component Exports', () => {
  it('exports SkipLink and StatusAnnouncerProvider from index', async () => {
    const { SkipLink, StatusAnnouncerProvider, useAnnouncer } = await import(
      './index'
    );
    expect(SkipLink).toBeDefined();
    expect(StatusAnnouncerProvider).toBeDefined();
    expect(useAnnouncer).toBeDefined();
  });
});
