import { BadRequestException } from '@nestjs/common';
import { XlsToJson } from './xls-to-json';
import fs from 'fs';
import path from 'path';
import { MissingEndDateErrorMessage, MissingStartDateErrorMessage } from '../constants/error.message';
import { DateTime } from 'luxon';

const formatBRMask = 'dd/MM/yyyy'

describe('XlsToJson', () => {
  it('should be defined', () => {
    expect(new XlsToJson()).toBeDefined();
  });

  it('Sending correct file, should return object', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../../test/mocks/FinalOriginal.xlsx'));
    const xlsToJson = new XlsToJson();
    const objectParsed = await xlsToJson.parser(buffer);
    expect(objectParsed).toBeDefined();
  });

  it('Sending correct file, should return object as expected', async () => {
    const expectedObject = {
      durationStart: DateTime.fromJSDate(new Date('2099-12-04'), { zone: 'utc' }).toFormat(formatBRMask),
      durationEnd: DateTime.fromJSDate(new Date('2099-12-31'), { zone: 'utc' }).toFormat(formatBRMask),
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90,
        },
        {
          tax: 2.5,
          periodStart: 91,
          periodEnd: 180,
        }
      ]
    }
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../../test/mocks/FinalOriginal.xlsx'));
    const xlsToJson = new XlsToJson();
    const objectParsed = await xlsToJson.parser(buffer);
    expect(objectParsed).toStrictEqual(expectedObject);
  });

  it('Sending correct file, should return correct dateTime object', async () => {
    const expextedDates = {
      durationStart: DateTime.fromJSDate(new Date('2099-12-04'), { zone: 'utc' }).toFormat(formatBRMask),
      durationEnd: DateTime.fromJSDate(new Date('2099-12-31'), { zone: 'utc' }).toFormat(formatBRMask),
    }
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../../test/mocks/FinalOriginal.xlsx'));
    const xlsToJson = new XlsToJson();
    const { durationEnd, durationStart } = await xlsToJson.getStartDurationAndEndDuration(buffer);
    expect(expextedDates.durationEnd).toBe(durationEnd);
    expect(expextedDates.durationStart).toBe(durationStart);
  });

  it('When start date is missing, should return bad request', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../../test/mocks/missingStartDate.xlsx'));
    const xlsToJson = new XlsToJson();
    expect(xlsToJson.getStartDurationAndEndDuration(buffer)).rejects.toThrow(new BadRequestException(MissingStartDateErrorMessage));
  });

  it('When end date is missing, should return bad request', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../../test/mocks/missingEndDate.xlsx'));
    const xlsToJson = new XlsToJson();
    expect(xlsToJson.getStartDurationAndEndDuration(buffer)).rejects.toThrow(new BadRequestException(MissingEndDateErrorMessage));
  });
});
