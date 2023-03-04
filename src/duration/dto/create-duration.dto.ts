import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsOptional } from 'class-validator'
import { Duration } from '../entities/duration.entity'

const uuidExample = '123e4567-e89b-12d3-a456-426614174000'
export class CreateDurationDto extends Duration {
  @ApiProperty({
    type: String,
    description: 'bankId',
    example: uuidExample
  })
  @IsUUID()
  readonly bankId: string

  @ApiProperty({
    type: String,
    description: 'durationStart',
    example: '01/06/2002'
  })
  @IsString()
  readonly durationStart: string | Date

  @ApiProperty({
    type: String,
    description: 'durationStart',
    example: '01/07/2002'
  })
  @IsString()
  @IsOptional()
  readonly durationEnd: string | Date

  @ApiProperty({
    type: String,
    example: uuidExample
  })
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly userCreatorId?: string

  @ApiProperty({
    type: String,
    description: 'userUpdaterId',
    example: uuidExample
  })
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly userUpdaterId?: string
}
