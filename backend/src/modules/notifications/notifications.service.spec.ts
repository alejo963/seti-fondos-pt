import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { MailerService } from '@nestjs-modules/mailer';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ConfigModule } from '@nestjs/config';
import { mockUser } from '../../../test/mocks/users.service';
import { NotificationMethod, User } from '../users/schemas/user.schema';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let mailerService: DeepMocked<MailerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: MailerService,
          useValue: createMock<MailerService>(),
        },
      ],
      imports: [ConfigModule],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    mailerService = module.get<DeepMocked<MailerService>>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send email', async () => {
    jest.spyOn(mailerService, 'sendMail').mockResolvedValueOnce('sent email');

    await service.sendNotification(mockUser() as any, 'test');

    expect(mailerService.sendMail).toHaveBeenCalled();
  });

  it('should send sms', async () => {
    jest.spyOn(service, 'sendSms').mockResolvedValueOnce();

    await service.sendNotification(
      mockUser(
        'Pepito',
        'Perez',
        '123456789',
        500000,
        NotificationMethod.SMS,
      ) as any,
      'test',
    );

    expect(service.sendSms).toHaveBeenCalled();
  });
});
